import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { Button, Container } from '@mui/material'
import ThemeButton from '../nav/ThemeButton'
import { useAppStore } from '../../store/appStore'
import Logo from './Logo'
import UserMenu from '../nav/UserMenu'

const Navbar = () => {
	const { handleOpenAuthModal, isLoggedIn } = useAppStore()
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed" color="inherit" sx={{ boxShadow: 1 }}>
				<Container maxWidth="xl" sx={{ padding: 0 }}>
					<Toolbar>
						<Box sx={{ flexGrow: 1 }}>
							<Logo />
						</Box>
						<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
							{isLoggedIn ? (
								<UserMenu />
							) : (
								<Button
									variant="outlined"
									color="primary"
									onClick={handleOpenAuthModal}>
									Get Started
								</Button>
							)}
							<ThemeButton />
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	)
}
export default Navbar
