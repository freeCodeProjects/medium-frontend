import { Box, Button, Input, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import BoldTypography from '../ui/BoldTypography'
import { Name, NameSchema } from '../../types/userTypes'
import { useAppStore } from '../../store/appStore'
import { useState, useRef, useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import { updateName } from '../../api/userAPI'
import { ErrorContext } from '../../context/ErrorContext'
import { LoadingButton } from '@mui/lab'

const NameSetting = () => {
	const { user, setUser, setAlertData } = useAppStore()
	const { serverErrorHandler } = useContext(ErrorContext)
	const [editing, setEditing] = useState(false)
	const nameRef = useRef<HTMLInputElement | null>(null)

	const { mutate, isLoading } = useMutation(
		(data: Name) => {
			return updateName(data)
		},
		{
			onError: (error: any) => {
				serverErrorHandler(error)
			},
			onSuccess: (data: any) => {
				setAlertData('Name updated!')
				setUser(data.data.user)
			}
		}
	)

	// https://react-hook-form.com/faqs#Howtosharerefusage
	const defaultValues = { name: user?.name }
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isDirty }
	} = useForm<Name>({
		resolver: zodResolver(NameSchema),
		defaultValues
	})
	const { ref, ...rest } = register('name')

	const onSubmit = (data: Name) => {
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
			nameRef.current?.firstChild?.setSelectionRange(-1, -1)
			nameRef.current?.firstChild?.focus()
		}, 0)
	}

	useEffect(() => {
		cancelEdit()
	}, [user])

	return (
		<Box sx={{ mt: 3 }}>
			<BoldTypography variant="h6">Name</BoldTypography>
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
						disabled={!editing}
						error={Boolean(errors.name)}
						placeholder="name"
						{...rest}
						name="name"
						ref={(e: HTMLInputElement) => {
							ref(e)
							nameRef.current = e
						}}
						sx={{ mt: 1 }}
					/>
					<Typography color="error">{errors.name?.message}</Typography>
					<Typography variant="body2" sx={{ mt: 2 }}>
						Your name appears on your Profile page, as your byline, and in your
						responses. It is a required field.
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
export default NameSetting
