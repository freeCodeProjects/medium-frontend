import { Box, Typography } from '@mui/material'
import ErrorImage from '../../assets/error.svg'

const NotFound = ({ message }: { message: string }) => {
	return (
		<Box
			sx={{
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column'
			}}>
			<Typography variant="h4" sx={{ textAlign: 'center' }}>
				{message}
			</Typography>
			<img style={{ maxWidth: 400 }} src={ErrorImage} alt="Random image" />
		</Box>
	)
}
export default NotFound
