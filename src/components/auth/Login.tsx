import { Box, Typography, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'react-query'
import { UserLoginData, LoginSchema } from '../../types/userTypes'
import { useAppStore } from '../../store/appStore'
import { useContext } from 'react'
import { ErrorContext } from '../../context/ErrorContext'
import { loginUser } from '../../api/userAPI'
import { LoadingButton } from '@mui/lab'

const Login = () => {
	const { setAlertData, handleCloseAuthModal, setUser } = useAppStore()
	const { serverErrorHandler } = useContext(ErrorContext)

	const { mutate, isLoading } = useMutation(
		(data: UserLoginData) => {
			return loginUser(data)
		},
		{
			onError: (error: any) => {
				serverErrorHandler(error)
			},
			onSuccess: (data: any) => {
				setAlertData('Logged in.')
				setUser(data.data.user)
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
	} = useForm<UserLoginData>({
		resolver: zodResolver(LoginSchema)
	})

	const onSubmit = (data: UserLoginData) => {
		mutate(data)
	}

	return (
		<>
			<Typography variant="h5" align="center" component="div">
				Welcome back
			</Typography>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
					<TextField
						error={Boolean(errors.password)}
						helperText={errors.password?.message}
						{...register('password')}
						fullWidth
						label="Password"
						type="password"
						variant="standard"
					/>
					<LoadingButton
						loading={isLoading}
						type="submit"
						variant="contained"
						sx={{ mt: 2 }}>
						Login
					</LoadingButton>
					<Button sx={{ textTransform: 'capitalize', alignSelf: 'start' }}>
						Forgot password?
					</Button>
				</Box>
			</Box>
		</>
	)
}
export default Login
