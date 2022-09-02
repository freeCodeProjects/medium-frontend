import { useQuery } from '@tanstack/react-query'
import { getUserById } from '../../api/userAPI'
import UserInfoPopup from '../ui/UserInfoPopup'
import { Avatar, Box, Typography } from '@mui/material'
import BoldTypography from './BoldTypography'
import dayjs from 'dayjs'

const Author = ({ userId, date }: { userId: string; date?: string }) => {
	const { data: author } = useQuery(['userById', userId], () =>
		getUserById(userId)
	)

	return author ? (
		<UserInfoPopup author={author.data}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: '0.5rem',
					width: 'min-content'
				}}>
				<Avatar
					sx={{ width: 36, height: 36 }}
					alt={author.data.name}
					src={author.data.photo}
				/>
				<BoldTypography className="truncate" variant="subtitle2">
					{author.data.name}
				</BoldTypography>
				{date && <Typography>{dayjs(date).format('DD MMM, YYYY')}</Typography>}
			</Box>
		</UserInfoPopup>
	) : (
		<div></div>
	)
}

export default Author
