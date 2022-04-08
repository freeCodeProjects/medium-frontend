import { Box, Typography, TextField, Button } from '@mui/material'

const Login = () => {
	return (
		<>
			<Typography variant="h5" align="center" component="div">
				Welcome back
			</Typography>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Box
					//onSubmit={}
					component="form"
					noValidate
					autoComplete="off"
					sx={{
						width: { xs: 9 / 10, sm: 2 / 3 },
						display: 'flex',
						flexDirection: 'column',
						gap: 2
					}}>
					<TextField fullWidth label="Email" type="email" variant="standard" />
					<TextField
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
