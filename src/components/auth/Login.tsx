import { Box, Typography, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { object, string } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type LoginForm = {
	email: string
	password: string
}

const schema = object({
	email: string().nonempty({ message: 'Email is required' }).email({
		message: 'Invalid email address'
	}),
	password: string().nonempty({ message: 'Password is required' }).min(6, {
		message: 'Password must be 6 or more characters long'
	})
})

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginForm>({
		resolver: zodResolver(schema)
	})
	const onSubmit = (data: any) => console.log(data)

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
					<Button type="submit" variant="contained" sx={{ mt: 2 }}>
						Login
					</Button>
					<Button sx={{ textTransform: 'capitalize', alignSelf: 'start' }}>
						Forgot password?
					</Button>
				</Box>
			</Box>
		</>
	)
}
export default Login
