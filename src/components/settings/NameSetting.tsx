import { Box, Button, Input, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import BoldTypography from '../ui/BoldTypography'
import { UserName, UserNameSchema } from '../../types/userTypes'
import { useAppStore } from '../../store/appStore'
import { useState, useRef, useContext } from 'react'
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
		(data: UserName) => {
			return updateName(data)
		},
		{
			onError: (error: any) => {
				serverErrorHandler(error)
			},
			onSuccess: (data: any) => {
				setAlertData('Name updated!')
				setUser(data.data.user)
				setEditing(false)
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
	} = useForm<UserName>({
		resolver: zodResolver(UserNameSchema),
		defaultValues
	})
	const { ref, ...rest } = register('name')

	const onSubmit = (data: UserName) => {
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
			<BoldTypography variant="h6">Name</BoldTypography>
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
						error={Boolean(errors.name)}
						defaultValue=""
						placeholder="name"
						{...rest}
						name="name"
						ref={(e: HTMLInputElement) => {
							ref(e)
							nameRef.current = e
						}}
						sx={{ mt: 1 }}
					/>
					<div>{errors.name?.message}</div>
					<Typography variant="body2" sx={{ mt: 2 }}>
						Your name appears on your Profile page, as your byline, and in your
						responses. It is a required field.
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
export default NameSetting
