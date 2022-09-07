import { Box, Typography } from '@mui/material'
import { Notification } from '../../types/notificationTypes'
import Author from '../ui/Author'

const NotificationCard = ({ notification }: { notification: Notification }) => {
	const actionText = () => {
		const { action } = notification
		if (action === 'follow') {
			return 'started following you'
		} else if (action === 'clap') {
			return 'clapped at'
		} else {
			return 'responded to'
		}
	}
	return (
		<Box
			sx={{
				display: 'flex',
				gap: '0.5rem',
				flexDirection: { xs: 'column', sm: 'row' }
			}}>
			<Author userId={notification.userId} date={notification.createdAt} />
			<Box sx={{ display: 'flex' }}>
				<Typography variant="subtitle2">
					<span style={{ color: 'gray', paddingRight: '0.5rem' }}>
						{actionText()}
					</span>
					{notification.message}
				</Typography>
			</Box>
		</Box>
	)
}
export default NotificationCard
