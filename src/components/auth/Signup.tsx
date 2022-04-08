import { Box, Typography, TextField, Button } from '@mui/material'

const Signup = () => {
	return (
		<>
			<Typography variant="h5" align="center" component="div">
				Join Medium
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
					<TextField fullWidth label="Name" variant="standard" />
					<TextField fullWidth label="Email" type="email" variant="standard" />
					<TextField
						fullWidth
						label="Password"
						type="password"
						variant="standard"
					/>
					<TextField
						fullWidth
						label="Confirm Password"
						type="password"
						variant="standard"
					/>
					<Button variant="contained" sx={{ mt: 2 }}>
						Register
					</Button>
				</Box>
			</Box>
		</>
	)
}
export default Signup
