import { Box, Button, Input, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import BoldTypography from '../ui/BoldTypography'
import { BioSchema, Bio } from '../../types/userTypes'
import { useContext, useRef, useState } from 'react'
import { ErrorContext } from '../../context/ErrorContext'
import { useAppStore } from '../../store/appStore'
import { useMutation } from 'react-query'
import { LoadingButton } from '@mui/lab'
import { updateBio } from '../../api/userAPI'

const BioSetting = () => {
	const { user, setUser, setAlertData } = useAppStore()
	const { serverErrorHandler } = useContext(ErrorContext)
	const [editing, setEditing] = useState(false)
	const nameRef = useRef<HTMLInputElement | null>(null)

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
				setEditing(false)
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
			nameRef.current?.firstChild?.focus()
		}, 0)
	}

	return (
		<Box sx={{ mt: 3 }}>
			<BoldTypography variant="h6">Short Bio</BoldTypography>
			<Box
				onSubmit={handleSubmit(onSubmit)}
				component="form"
				sx={{
					display: 'flex'
				}}
				noValidate
				autoComplete="off">
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						mr: 2,
						width: { xs: '80%', sm: '70%' }
					}}>
					<Input
						disabled={!editing}
						error={Boolean(errors.bio)}
						defaultValue=""
						placeholder="bio"
						{...rest}
						name="bio"
						ref={(e: HTMLInputElement) => {
							ref(e)
							nameRef.current = e
						}}
						multiline
						rows={2}
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
						justifyContent: 'flex-end',
						alignItems: 'start'
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
