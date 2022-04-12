import { Box, Typography, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'react-query'
import { useAppStore } from '../../store/appStore'
import { useContext } from 'react'
import { ErrorContext } from '../../context/ErrorContext'
import { LoadingButton } from '@mui/lab'
import { signupUser } from '../../api/userAPI'
import { UserSignupData, SignupSchema } from '../../types/userTypes'

const Signup = () => {
	const { setAlertData, handleCloseAuthModal } = useAppStore()
	const { serverErrorHandler } = useContext(ErrorContext)

	const { mutate, isLoading } = useMutation(
		(data: UserSignupData) => {
			return signupUser(data)
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
		formState: { errors },
		reset
	} = useForm<UserSignupData>({
		resolver: zodResolver(SignupSchema)
	})
	const onSubmit = (data: UserSignupData) => {
		mutate(data)
	}

	return (
		<>
			<Typography variant="h5" align="center" component="div">
				Join Medium
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
						error={Boolean(errors.name)}
						helperText={errors.name?.message}
						{...register('name')}
						fullWidth
						label="Name"
						variant="standard"
					/>
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
					<TextField
						error={Boolean(errors.confirmPassword)}
						helperText={errors.confirmPassword?.message}
						{...register('confirmPassword')}
						fullWidth
						label="Confirm Password"
						type="password"
						variant="standard"
					/>
					<LoadingButton
						loading={isLoading}
						type="submit"
						variant="contained"
						sx={{ mt: 2 }}>
						Register
					</LoadingButton>
				</Box>
			</Box>
		</>
	)
}
export default Signup
