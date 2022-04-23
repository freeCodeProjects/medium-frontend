import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { ErrorContext } from '../../context/ErrorContext'
import { useAppStore } from '../../store/appStore'
import { sendResetPasswordMail } from '../../api/userAPI'
import {
	ResetPasswordMailData,
	ResetPasswordMailSchema
} from '../../types/userTypes'
import { LoadingButton } from '@mui/lab'

type IProps = {
	setPasswordResetPage: Function
}

const PasswordResetForm = ({ setPasswordResetPage }: IProps) => {
	const { setAlertData, handleCloseAuthModal, setUser } = useAppStore()
	const { serverErrorHandler } = useContext(ErrorContext)

	const { mutate, isLoading } = useMutation(
		(data: ResetPasswordMailData) => {
			return sendResetPasswordMail(data)
		},
		{
			onError: (error: any) => {
				serverErrorHandler(error)
			},
			onSuccess: (data: any) => {
				setAlertData(data.data.message)
				reset()
				handleCloseAuthModal()
			}
		}
	)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ResetPasswordMailData>({
		resolver: zodResolver(ResetPasswordMailSchema)
	})

	const onSubmit = (data: ResetPasswordMailData) => {
		mutate(data)
	}

	return (
		<Box>
			<Typography
				variant="h5"
				align="center"
				sx={{ fontWeight: 600 }}
				component="div">
				Forget Password
			</Typography>
			<Box
				sx={{
					p: 2,
					display: 'flex',
					justifyContent: 'center'
				}}>
				<Typography sx={{ width: 320, textAlign: 'center' }}>
					Provide your account’s email for which you want to reset your
					password.
				</Typography>
			</Box>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
					gap: 3
				}}>
				<Box
					onSubmit={handleSubmit(onSubmit)}
					component="form"
					noValidate
					autoComplete="off"
					sx={{
						width: { xs: 9 / 10, sm: 2 / 3 },
						display: 'flex',
						flexDirection: 'column',
						gap: 1
					}}>
					<TextField
						error={Boolean(errors.email)}
						helperText={errors.email?.message}
						{...register('email')}
						fullWidth
						label="Email"
						type="email"
						variant="standard"
					/>
					<LoadingButton
						loading={isLoading}
						type="submit"
						variant="contained"
						sx={{ mt: 2 }}>
						Continue
					</LoadingButton>
				</Box>
				<Button
					onClick={() => setPasswordResetPage(false)}
					sx={{ textTransform: 'lowercase' }}>
					Go back to login screen
				</Button>
			</Box>
		</Box>
	)
}
export default PasswordResetForm
