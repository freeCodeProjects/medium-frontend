import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import SvgIcon from '@mui/material/SvgIcon'
import { Button, Container } from '@mui/material'
import ThemeButton from '../nav/ThemeButton'
import { useAppStore } from '../../store/appStore'
import Logo from './Logo'

const Navbar = () => {
	const { handleOpenAuthModal } = useAppStore()
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed" color="inherit" sx={{ boxShadow: 1 }}>
				<Container maxWidth="xl" sx={{ padding: 0 }}>
					<Toolbar>
						<Logo />
						<Button
							variant="outlined"
							color="primary"
							onClick={handleOpenAuthModal}>
							Get Started
						</Button>
						<ThemeButton />
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	)
}
export default Navbar
