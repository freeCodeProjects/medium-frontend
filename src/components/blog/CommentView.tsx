import {
	Box,
	IconButton,
	Menu,
	MenuItem,
	Stack,
	Typography
} from '@mui/material'
import { Comment } from '../../types/commentTypes'
import Author from '../ui/Author'
import ClapButton from '../ui/ClapButton'
import CommentIcon from '../ui/CommentIcon'
import { Fragment, useContext, useState } from 'react'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useAppStore } from '../../store/appStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteComment } from '../../api/commentAPI'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'

type ActionMenuProps = {
	id: string
	update: Function
	relatedTo: 'blog' | 'comment'
	parentId: string
}

const ActionMenu = ({ id, update, relatedTo, parentId }: ActionMenuProps) => {
	const params = useParams()
	const { setAlertData } = useAppStore()
	const queryClient = useQueryClient()
	const { serverErrorHandler } = useContext(AppContext)
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
	const open = Boolean(anchorEl)

	const { mutate } = useMutation(() => deleteComment(id), {
		onError: (error: any) => {
			serverErrorHandler(error)
		},
		onSuccess: (data: any) => {
			setAlertData(data.data)

			//remove the comment from client cache
			queryClient.setQueriesData(
				{ exact: false, queryKey: ['comments'] },
				(old: any) => {
					old &&
						old.pages.forEach((page: any) => {
							page.data = page.data.filter((comment: any) => {
								if (comment._id !== id) {
									return comment
								}
							})
							// console.log('data : ', page.data)
						})
				}
			)

			//Optimistically update the responsesCount in post on client cache
			if (relatedTo === 'blog') {
				queryClient.setQueryData(['blogBySlug', params.slug], (old: any) => {
					old.data.responsesCount = old.data.responsesCount - 1
				})
			} else {
				queryClient.setQueriesData(
					{ exact: false, queryKey: ['comments'] },
					(old: any) => {
						old &&
							old.pages.forEach((page: any) => {
								page.data.forEach((data: any) => {
									if (data._id === parentId) {
										data.responsesCount = data.responsesCount - 1
									}
								})
							})
					}
				)
			}
		}
	})

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<Fragment>
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
				<MenuItem onClick={() => update()}>Edit</MenuItem>
				<MenuItem sx={{ color: 'error.main' }} onClick={() => mutate()}>
					Delete
				</MenuItem>
			</Menu>
		</Fragment>
	)
}

const CommentView = ({ comment }: { comment: Comment }) => {
	const [formToggle, setFormToggle] = useState(false)
	const [responseToggle, setResponseToggle] = useState(false)
	const [isUpdating, setIsUpdating] = useState(false)
	const { user } = useAppStore()

	return (
		<Box sx={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
			{!isUpdating ? (
				<Fragment>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						spacing={2}>
						<Author userId={comment.userId} date={comment.createdAt} />
						{/* show action menu only to author */}
						{user && comment.userId === user._id && (
							<ActionMenu
								update={() => setIsUpdating(true)}
								id={comment._id}
								relatedTo={comment.relatedTo}
								parentId={comment.postId}
							/>
						)}
					</Stack>
					<Typography variant="subtitle2">{comment.comment}</Typography>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						spacing={2}>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							spacing={2}>
							<ClapButton
								postId={comment._id}
								claps={comment.clapsCount}
								authorId={comment.userId}
								relatedTo="comment"
							/>
							{comment.responsesCount > 0 && (
								<Stack
									sx={{ cursor: 'pointer' }}
									onClick={() => setResponseToggle(!responseToggle)}
									direction="row"
									alignItems="center"
									spacing={0.5}>
									<CommentIcon />
									{!responseToggle ? (
										<Typography>{comment.responsesCount} replies</Typography>
									) : (
										<Typography>Hide replies</Typography>
									)}
								</Stack>
							)}
						</Stack>
						<Typography
							onClick={() => setFormToggle(!formToggle)}
							sx={{ cursor: 'pointer' }}>
							reply
						</Typography>
					</Stack>
					<Box
						sx={{
							ml: '1rem',
							borderLeft: '5px solid',
							borderColor: 'text.disabled'
						}}>
						<Box sx={{ pl: '0.5rem' }}>
							{formToggle && (
								<CommentForm
									postId={comment._id}
									relatedTo="comment"
									closeForm={() => setFormToggle(false)}
									openResponses={() => setResponseToggle(true)}
								/>
							)}
							{responseToggle && comment.responsesCount > 0 && (
								<CommentList
									postId={comment._id}
									sortBy="recent"
									relatedTo="comment"
								/>
							)}
						</Box>
					</Box>
				</Fragment>
			) : (
				<CommentForm
					postId={comment._id}
					closeForm={() => setIsUpdating(false)}
					content={comment.comment}
					isUpdating={isUpdating}
				/>
			)}
		</Box>
	)
}
export default CommentView
