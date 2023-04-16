import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { Badge, Button, Container, IconButton, Stack } from '@mui/material'
import ThemeButton from '../nav/ThemeButton'
import { useAppStore } from '../../store/appStore'
import Logo from './Logo'
import UserMenu from '../nav/UserMenu'
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getNotificationCount } from '../../api/notificationAPI'
import SearchBar from '../nav/SearchBar'

const Navbar = () => {
	const { isLoggedIn, handleOpenAuthModal } = useAppStore()

	const { data } = useQuery(['notificationCount'], getNotificationCount, {
		enabled: isLoggedIn,
		staleTime: 0,
		refetchInterval: 2 * 60 * 1000
	})

	const newNotificationCount = data?.data ? data?.data.newNotificationCount : 0

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed" color="inherit" sx={{ boxShadow: 1 }}>
				<Container
					maxWidth="xl"
					sx={{ padding: { xs: '0 0', sm: '0 12px', md: '0 24px' } }}
				>
					<Toolbar>
						<Box sx={{ flexGrow: 1 }}>
							<Logo />
						</Box>
						<Box
							sx={{
								display: 'flex',
								gap: { xs: 1, md: 2 },
								alignItems: 'center'
							}}
						>
							{/* <SearchBar /> */}
							{isLoggedIn ? (
								<Stack direction="row" spacing={1}>
									<Link className="link" to="/list">
										<IconButton aria-label="bookmarks">
											<BookmarksOutlinedIcon />
										</IconButton>
									</Link>
									<Link className="link" to="/notifications">
										<IconButton aria-label="notification">
											<Badge
												badgeContent={newNotificationCount}
												color="success"
											>
												<NotificationsOutlinedIcon />
											</Badge>
										</IconButton>
									</Link>
									<UserMenu />
								</Stack>
							) : (
								<Button
									variant="outlined"
									color="primary"
									onClick={handleOpenAuthModal}
								>
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
