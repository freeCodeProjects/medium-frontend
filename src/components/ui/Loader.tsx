import { Box, CircularProgress } from '@mui/material'

const Loader = () => {
	return (
		<Box
			sx={{
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: 120
			}}>
			<CircularProgress color="secondary" />
		</Box>
	)
}
export default Loader
