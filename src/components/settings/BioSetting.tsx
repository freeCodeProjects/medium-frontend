import { Box, Button, Input, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import BoldTypography from '../ui/BoldTypography'
import { BioSchema, Bio } from '../../types/userTypes'
import { useContext, useRef, useState, useEffect } from 'react'
import { ErrorContext } from '../../context/ErrorContext'
import { useAppStore } from '../../store/appStore'
import { useMutation } from 'react-query'
import { LoadingButton } from '@mui/lab'
import { updateBio } from '../../api/userAPI'

const BioSetting = () => {
	const { user, setUser, setAlertData } = useAppStore()
	const { serverErrorHandler } = useContext(ErrorContext)
	const [editing, setEditing] = useState(false)
	const bioRef = useRef<HTMLTextAreaElement | null>(null)

	const { mutate, isLoading } = useMutation(
		(data: Bio) => {
			return updateBio(data)
		},
		{
			onError: (error: any) => {
				serverErrorHandler(error)
			},
			onSuccess: (data: any) => {
				setAlertData('Bio updated!')
				setUser(data.data.user)
			}
		}
	)

	// https://react-hook-form.com/faqs#Howtosharerefusage
	const defaultValues = { bio: user?.bio }

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isDirty }
	} = useForm<Bio>({
		resolver: zodResolver(BioSchema),
		defaultValues
	})
	const { ref, ...rest } = register('bio')

	const onSubmit = (data: Bio) => {
		if (isDirty) {
			mutate(data)
			console.log(data)
		}
	}

	const cancelEdit = () => {
		setEditing(false)
		reset(defaultValues)
	}

	const startEdit = () => {
		setEditing(true)
		setTimeout(() => {
			bioRef.current?.firstChild?.setSelectionRange(-1, -1)
			bioRef.current?.firstChild?.focus()
		}, 0)
	}

	useEffect(() => {
		cancelEdit()
	}, [user])

	return (
		<Box sx={{ mt: 3 }}>
			<BoldTypography variant="h6">Short Bio</BoldTypography>
			<Box
				onSubmit={handleSubmit(onSubmit)}
				component="form"
				sx={{
					display: 'flex',
					flexWrap: 'wrap'
				}}
				noValidate
				autoComplete="off">
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						mr: 2,
						width: { xs: '100%', sm: '65%', md: '75%' }
					}}>
					<Input
						multiline
						//Getting below error when using rhf defaultValues - "Material-UI: Too many re-renders. The layout is unstable. TextareaAutosize limits the number of renders to prevent an infinite loop". That's why manually adding defaultValue
						defaultValue={defaultValues.bio}
						disabled={!editing}
						error={Boolean(errors.bio)}
						placeholder="bio"
						{...rest}
						name="bio"
						ref={(e: HTMLTextAreaElement) => {
							ref(e)
							bioRef.current = e
						}}
						sx={{ mt: 1 }}
					/>
					<div>{errors.bio?.message}</div>
					<Typography variant="body2" sx={{ mt: 2 }}>
						Your bio appears on your Profile and next to your stories. Max 160
						characters.
					</Typography>
				</Box>
				<Box
					sx={{
						flexGrow: 1,
						display: 'flex',
						justifyContent: { sm: 'flex-end' },
						alignItems: { sm: 'start' },
						mt: { xs: 1, sm: 0 }
					}}>
					{!editing ? (
						<Button variant="outlined" onClick={startEdit}>
							Edit
						</Button>
					) : (
						<Box
							sx={{
								display: 'flex',
								flexWrap: 'wrap',
								gap: 1,
								justifyContent: 'end'
							}}>
							<LoadingButton
								loading={isLoading}
								type="submit"
								variant="outlined"
								color="success">
								Save
							</LoadingButton>
							<Button variant="outlined" color="inherit" onClick={cancelEdit}>
								Cancel
							</Button>
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	)
}
export default BioSetting
