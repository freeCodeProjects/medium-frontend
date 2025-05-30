import {
	LogoutOutlined,
	CreateOutlined,
	MenuBookOutlined,
	SettingsOutlined
} from '@mui/icons-material'
import {
	Avatar,
	Menu,
	MenuItem,
	Box,
	ListItemIcon,
	Divider
} from '@mui/material'
import { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAppStore } from '../../store/appStore'
import { getLoggedInUser, logoutUser } from '../../api/userAPI'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

const UserMenu = () => {
	const { user, setUser, deleteUser } = useAppStore()
	const { serverErrorHandler } = useContext(AppContext)

	useQuery(['user'], getLoggedInUser, {
		onError: (error: any) => {
			serverErrorHandler(error)
		},
		onSuccess: (data: any) => {
			setUser(data.data.user)
		},
		refetchOnReconnect: 'always'
	})

	const { refetch: logoutUserTrigger } = useQuery(['logout'], logoutUser, {
		enabled: false,
		onError: (error: any) => {
			serverErrorHandler(error)
		},
		onSuccess: (data: any) => {
			deleteUser()
		}
	})

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	const logout = () => {
		logoutUserTrigger()
		handleClose()
	}

	return (
		<div>
			{user && (
				<div>
					<Avatar
						src={user.photo}
						alt={user.name}
						onClick={handleClick}
						sx={{
							bgcolor: 'grey.400',
							cursor: 'pointer'
						}}
					/>
					<Menu
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center'
						}}
						sx={{ mt: 1 }}
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button'
						}}
					>
						<Box sx={{ width: 200 }}>
							<Box
								sx={{
									px: 2,
									py: 1,
									display: 'flex',
									gap: 1,
									alignItems: 'center'
								}}
							>
								<Avatar src={user.photo} alt={user.name} />
								<Box>
									<Box
										component="b"
										className="truncate"
										sx={{
											width: 120,
											mb: 0.5
										}}
									>
										{user.name}
									</Box>
									<Box
										component="i"
										className="truncate"
										sx={{
											width: 120,
											fontSize: 10
										}}
									>
										{user.userName}
									</Box>
								</Box>
							</Box>
							<Divider sx={{ my: 1 }} />
							<MenuItem component={Link} to="/add">
								<ListItemIcon>
									<CreateOutlined fontSize="small" />
								</ListItemIcon>
								Write a story
							</MenuItem>
							<MenuItem component={Link} to="/stories">
								<ListItemIcon>
									<MenuBookOutlined fontSize="small" />
								</ListItemIcon>
								Stories
							</MenuItem>
							<MenuItem component={Link} to="/settings">
								<ListItemIcon>
									<SettingsOutlined fontSize="small" />
								</ListItemIcon>
								Settings
							</MenuItem>
							<Divider />
							<MenuItem onClick={logout}>
								<ListItemIcon>
									<LogoutOutlined fontSize="small" />
								</ListItemIcon>
								Logout
							</MenuItem>
						</Box>
					</Menu>
				</div>
			)}
		</div>
	)
}
export default UserMenu
