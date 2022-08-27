import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { Button, Container, IconButton, Stack } from '@mui/material'
import ThemeButton from '../nav/ThemeButton'
import { useAppStore } from '../../store/appStore'
import Logo from './Logo'
import UserMenu from '../nav/UserMenu'
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined'
import { Link } from 'react-router-dom'

const Navbar = () => {
	const { handleOpenAuthModal, isLoggedIn } = useAppStore()
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed" color="inherit" sx={{ boxShadow: 1 }}>
				<Container
					maxWidth="xl"
					sx={{ padding: { xs: '0 0', sm: '0 12px', md: '0 24px' } }}>
					<Toolbar>
						<Box sx={{ flexGrow: 1 }}>
							<Logo />
						</Box>
						<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
							{isLoggedIn ? (
								<Stack direction="row" spacing={2}>
									<IconButton aria-label="bookmarks">
										<Link className="link" to="/list">
											<BookmarksOutlinedIcon />
										</Link>
									</IconButton>
									<UserMenu />
								</Stack>
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
