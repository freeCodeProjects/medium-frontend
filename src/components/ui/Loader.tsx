import { Box, CircularProgress } from '@mui/material'

const Loader = () => {
	return (
		<Box
			sx={{
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
			<CircularProgress color="secondary" />
		</Box>
	)
}
export default Loader
