import {
	Typography,
	Stack,
	Divider,
	IconButton,
	MenuItem,
	Menu,
	Dialog,
	Slide,
	Box,
	Button
} from '@mui/material'
import { Blog } from '../../types/blogTypes'
import dayjs from 'dayjs'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { forwardRef, useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { TransitionProps } from '@mui/material/transitions'
import CloseIcon from '@mui/icons-material/Close'
import { deleteBlog } from '../../api/blogAPI'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AppContext } from '../../context/AppContext'
import { LoadingButton } from '@mui/lab'

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />
})

const BlogCard = ({ blog }: { blog: Blog }) => {
	const { serverErrorHandler } = useContext(AppContext)
	const navigate = useNavigate()
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
	const open = Boolean(anchorEl)
	const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false)
	const queryClient = useQueryClient()

	const { mutate: deleteBlogAction, isLoading } = useMutation(
		() => deleteBlog(blog._id),
		{
			onError: (error: any) => {
				serverErrorHandler(error)
			},
			onSuccess: (data: any) => {
				queryClient.invalidateQueries([
					`${blog.isPublished ? 'published' : 'draft'}-stories`
				])
				closeDeleteConfirmModal()
			}
		}
	)

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const closeDeleteConfirmModal = () => {
		setOpenDeleteConfirmModal(false)
	}

	return (
		<Stack spacing={1} sx={{ mb: '1rem' }}>
			<Typography
				onClick={() => navigate(`/update/${blog._id}`)}
				sx={{ cursor: 'pointer', fontWeight: 600 }}>
				{blog.isPublished ? blog.publishedTitle : blog.title}
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
					<MenuItem
						sx={{ color: 'error.main' }}
						onClick={() => setOpenDeleteConfirmModal(true)}>
						Delete
					</MenuItem>
				</Menu>
			</Stack>
			<Dialog
				PaperProps={{
					sx: {
						height: 540,
						display: 'flex'
					}
				}}
				maxWidth="sm"
				fullWidth
				open={openDeleteConfirmModal}
				onClose={closeDeleteConfirmModal}
				TransitionComponent={Transition}
				keepMounted>
				<Box sx={{ display: 'flex', justifyContent: 'end' }}>
					<IconButton aria-label="delete" onClick={closeDeleteConfirmModal}>
						<CloseIcon />
					</IconButton>
				</Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flex: 0.9,
						flexDirection: 'column',
						gap: '0.5rem',
						px: '2rem'
					}}>
					<Typography variant="h4">Delete story</Typography>
					<Typography>Are you sure you want to delete this story?</Typography>
					<Stack
						direction="row"
						alignItems="center"
						spacing={2}
						sx={{ mt: '1rem' }}>
						<Button
							color="neutral"
							variant="outlined"
							onClick={closeDeleteConfirmModal}>
							Cancel
						</Button>
						<LoadingButton
							loading={isLoading}
							color="error"
							variant="contained"
							onClick={() => deleteBlogAction()}>
							Delete
						</LoadingButton>
					</Stack>
				</Box>
			</Dialog>
			<Divider />
		</Stack>
	)
}
export default BlogCard
