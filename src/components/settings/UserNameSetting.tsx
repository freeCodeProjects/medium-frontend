import { Box, Button, Input, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import BoldTypography from '../ui/BoldTypography'
import { UserName, UserNameSchema } from '../../types/userTypes'
import { useAppStore } from '../../store/appStore'
import { useState, useRef, useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import { updateUserName } from '../../api/userAPI'
import { ErrorContext } from '../../context/ErrorContext'
import { LoadingButton } from '@mui/lab'

const UserNameSetting = () => {
	const { user, setUser, setAlertData } = useAppStore()
	const { serverErrorHandler } = useContext(ErrorContext)
	const [editing, setEditing] = useState(false)
	const nameRef = useRef<HTMLInputElement | null>(null)

	const { mutate, isLoading } = useMutation(
		(data: UserName) => {
			return updateUserName(data)
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
	const defaultValues = { userName: user?.userName }
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isDirty }
	} = useForm<UserName>({
		resolver: zodResolver(UserNameSchema),
		defaultValues
	})
	const { ref, ...rest } = register('userName')

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

	useEffect(() => {
		cancelEdit()
	}, [user])

	return (
		<Box sx={{ mt: 3 }}>
			<BoldTypography variant="h6">Username & URL</BoldTypography>
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
						display: 'grid',
						gridTemplateColumns: '100px 1fr',
						alignItems: 'start',
						gap: 1,
						mr: 2,
						my: 1,
						width: { xs: '100%', sm: '65%', md: '75%' }
					}}>
					<BoldTypography variant="body1">Username</BoldTypography>
					<Box>
						<Input
							disabled={!editing}
							error={Boolean(errors.userName)}
							placeholder="userName"
							{...rest}
							name="userName"
							ref={(e: HTMLInputElement) => {
								ref(e)
								nameRef.current = e
							}}
							sx={{ width: { xs: '100%' } }}
						/>
						<div>{errors.userName?.message}</div>
					</Box>
					<BoldTypography variant="body1">URL</BoldTypography>
					<Typography
						variant="body1"
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							width: { xs: '100%' },
							wordBreak: 'break-all'
						}}>
						{import.meta.env.VITE_SITE_URL}/{user?.userName}
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
export default UserNameSetting
