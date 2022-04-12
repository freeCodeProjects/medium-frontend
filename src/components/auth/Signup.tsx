import { Box, Typography, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { object, string } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'react-query'
import axiosInstance from '../../utils/axios'
import { useAppStore } from '../../store/appStore'
import { useContext } from 'react'
import { ErrorContext } from '../../context/ErrorContext'
import { LoadingButton } from '@mui/lab'

type SignupForm = {
	name: string
	email: string
	password: string
	confirmPassword: string
}

const schema = object({
	name: string()
		.nonempty({ message: 'Name is required' })
		.min(3, {
			message: 'Name must be 3 or more characters long'
		})
		.max(50, {
			message: 'Name must be less than 50 characters long'
		}),
	email: string().nonempty({ message: 'Email is required' }).email({
		message: 'Invalid email address'
	}),
	password: string().nonempty({ message: 'Password is required' }).min(6, {
		message: 'Password must be 6 or more characters long'
	}),
	confirmPassword: string()
		.nonempty({ message: 'Confirm password is required' })
		.min(6, {
			message: 'ConfirmPassword must be 6 or more characters long'
		})
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
	message: "Passwords don't match",
	path: ['confirmPassword']
})

const Signup = () => {
	const { setAlertData, handleCloseAuthModal } = useAppStore()
	const { serverErrorHandler } = useContext(ErrorContext)

	const { mutate, isLoading } = useMutation(
		(data) => {
			return axiosInstance.post('/api/signup', data)
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
	} = useForm<SignupForm>({
		resolver: zodResolver(schema)
	})
	const onSubmit = (data: any) => {
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
