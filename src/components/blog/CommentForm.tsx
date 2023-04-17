import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	TextField
} from '@mui/material'
import { useState, useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addComment, updateComment } from '../../api/commentAPI'
import { AppContext } from '../../context/AppContext'
import { useAppStore } from '../../store/appStore'
import { LoadingButton } from '@mui/lab'
import BoldTypography from '../ui/BoldTypography'
import { useParams } from 'react-router-dom'

type IProps = {
	postId: string
	closeForm: Function
	relatedTo?: 'blog' | 'comment'
	openResponses?: Function
	isUpdating?: boolean
	cancelEditing?: boolean
	content?: string
}
const CommentForm = ({
	postId,
	relatedTo,
	closeForm,
	openResponses,
	content,
	isUpdating = false
}: IProps) => {
	const params = useParams()
	const { setAlertData, isLoggedIn, handleOpenAuthModal, user } = useAppStore()
	const [comment, setComment] = useState(content || '')
	const { serverErrorHandler } = useContext(AppContext)
	const queryClient = useQueryClient()

	const { mutate: add, isLoading: addLoading } = useMutation(
		() =>
			addComment({ postId, comment: comment.trim(), relatedTo: relatedTo! }),
		{
			onError: (error: any) => {
				serverErrorHandler(error)
			},
			onSuccess: (data: any) => {
				setAlertData(data.data)
				closeForm()
				openResponses && openResponses()
				queryClient.invalidateQueries(['comments', postId])

				//Optimistically update the responsesCount in post on client side
				if (relatedTo === 'blog') {
					queryClient.setQueryData(['blogBySlug', params.slug], (old: any) => {
						old.data.responsesCount = old.data.responsesCount + 1
					})
				} else {
					queryClient.setQueriesData(
						{ exact: false, queryKey: ['comments'] },
						(old: any) => {
							// console.log('old : ', old)
							old &&
								old.pages.forEach((page: any) => {
									page.data.forEach((data: any) => {
										if (data._id === postId) {
											data.responsesCount = data.responsesCount + 1
										}
									})
								})
						}
					)
				}
			}
		}
	)

	const { mutate: update, isLoading: updateLoading } = useMutation(
		() => updateComment(postId, comment),
		{
			onError: (error: any) => {
				serverErrorHandler(error)
			},
			onSuccess: (data: any) => {
				setAlertData(data.data)
				closeForm()

				queryClient.setQueriesData(
					{ exact: false, queryKey: ['comments'] },
					(old: any) => {
						// console.log('old : ', old)
						old &&
							old.pages.forEach((page: any) => {
								page.data.forEach((data: any) => {
									if (data._id === postId) {
										data.comment = comment.trim()
									}
								})
							})
					}
				)
			}
		}
	)

	const addOrUpdateResponse = () => {
		if (!isLoggedIn) {
			handleOpenAuthModal()
		} else {
			if (isUpdating) {
				//stop update if there is no change.
				if (comment.trim() !== content) {
					update()
				} else {
					closeForm()
				}
			} else {
				add()
			}
		}
	}

	return (
		<Card>
			<CardContent>
				{user && relatedTo == 'blog' && (
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: '0.5rem',
							width: 'min-content',
							pb: '0.5rem'
						}}
					>
						<Avatar
							sx={{ width: 36, height: 36 }}
							alt={user.name}
							src={user.photo}
						/>
						<BoldTypography className="truncate" variant="subtitle2">
							{user.name}
						</BoldTypography>
					</Box>
				)}
				<TextField
					autoFocus
					fullWidth
					id="standard-multiline-static"
					placeholder="What are your thoughts?"
					multiline
					onChange={(event) => setComment(event.target.value)}
					minRows={3}
					value={comment}
					variant="standard"
					InputProps={{ disableUnderline: true }}
				/>
			</CardContent>
			<CardActions
				sx={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}
			>
				{/* @ts-ignore */}
				<Button color="neutral" size="small" onClick={closeForm}>
					Cancel
				</Button>
				<LoadingButton
					loading={addLoading || updateLoading}
					disabled={!comment.trim()}
					onClick={addOrUpdateResponse}
					color="success"
					variant="contained"
					size="small"
				>
					{!isUpdating ? 'Respond' : 'Update'}
				</LoadingButton>
			</CardActions>
		</Card>
	)
}
export default CommentForm
