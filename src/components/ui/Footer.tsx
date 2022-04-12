import { Box, Container } from '@mui/material'
import Logo from './Logo'

const Footer = () => {
	return (
		<Box
			sx={{
				width: '100%',
				height: 64,
				bgcolor: 'grey.400',
				display: 'flex',
				alignItems: 'center'
			}}>
			<Container maxWidth="xl">
				<Box sx={{ padding: '0 24px' }}>
					<Logo />
				</Box>
			</Container>
		</Box>
	)
}
export default Footer
