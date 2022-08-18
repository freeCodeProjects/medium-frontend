import {
	Typography,
	Stack,
	Divider,
	IconButton,
	MenuItem,
	Menu
} from '@mui/material'
import { Blog } from '../../types/blogTypes'
import dayjs from 'dayjs'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const BlogCard = ({ blog }: { blog: Blog }) => {
	const navigate = useNavigate()
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
	const open = Boolean(anchorEl)
	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<Stack spacing={1} sx={{ mb: '1rem' }}>
			<Typography
				onClick={() => navigate(`/update/${blog._id}`)}
				sx={{ cursor: 'pointer', fontWeight: 600 }}>
				{blog.title}
			</Typography>
			<Typography className="truncate" variant="subtitle1">
				{blog.subTitle}
			</Typography>
			<Stack direction="row" alignItems="center" spacing={2}>
				<Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
					{dayjs(blog.updatedAt).format('MMM D')}
				</Typography>
				{blog.readTime > 0 && (
					<Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
						{blog.readTime} min read
					</Typography>
				)}
				<IconButton onClick={(e) => handleClick(e)} size="small">
					<MoreHorizIcon />
				</IconButton>
				<Menu
					anchorEl={anchorEl}
					id="account-menu"
					open={open}
					onClose={handleClose}
					onClick={handleClose}
					transformOrigin={{ horizontal: 'right', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
					<MenuItem onClick={() => navigate(`/update/${blog._id}`)}>
						Edit
					</MenuItem>
					<MenuItem sx={{ color: 'error.main' }}>Delete</MenuItem>
				</Menu>
			</Stack>
			<Divider />
		</Stack>
	)
}
export default BlogCard
