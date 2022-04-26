import { Box, Typography, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'react-query'
import { LoadingButton } from '@mui/lab'
import { useAppStore } from '../store/appStore'
import { AppContext } from '../context/AppContext'
import { useContext, useState, useEffect } from 'react'
import { ResetPasswordData, ResetPasswordSchema } from '../types/userTypes'
import { resetPassword } from '../api/userAPI'
import { useNavigate, useSearchParams } from 'react-router-dom'

const ResetPassword = () => {
	const { setAlertData } = useAppStore()
	const { serverErrorHandler } = useContext(AppContext)
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const [token, setToken] = useState('')

	const { mutate, isLoading } = useMutation(
		(data: ResetPasswordData) => resetPassword({ token, ...data }),
		{
			onError: (error: any) => {
				serverErrorHandler(error)
			},
			onSuccess: (data: any) => {
				setAlertData(data.data.message)
				reset()
				navigate('/')
			}
		}
	)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ResetPasswordData>({
		resolver: zodResolver(ResetPasswordSchema)
	})

	const onSubmit = (data: ResetPasswordData) => {
		mutate(data)
	}

	useEffect(() => {
		const tokenQuery = searchParams.get('token')!

		if (!tokenQuery) {
			navigate('/')
		}
		setToken(tokenQuery)
	}, [])

	return (
		<Box
			sx={{
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'center',
				gap: 3
			}}>
			<Typography
				variant="h5"
				align="center"
				sx={{ fontWeight: 600, mt: 3 }}
				component="div">
				Reset password
			</Typography>
			<Box
				onSubmit={handleSubmit(onSubmit)}
				component="form"
				noValidate
				autoComplete="off"
				sx={{
					width: { xs: 9 / 10, sm: 480 },
					display: 'flex',
					flexDirection: 'column',
					gap: 3,
					mb: 3
				}}>
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
					Reset
				</LoadingButton>
			</Box>
		</Box>
	)
}
export default ResetPassword
