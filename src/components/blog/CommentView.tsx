import { Box, Stack, Typography } from '@mui/material'
import { Comment } from '../../types/commentTypes'
import Author from '../ui/Author'
import ClapButton from '../ui/ClapButton'
import CommentIcon from '../ui/CommentIcon'
import { useState } from 'react'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

type IProps = {
	comment: Comment
}

const CommentView = ({ comment }: IProps) => {
	const [formToggle, setFormToggle] = useState(false)
	const [responseToggle, setResponseToggle] = useState(false)

	return (
		<Box sx={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
			<Author userId={comment.userId} date={comment.createdAt} />
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
					{responseToggle && (
						<CommentList
							postId={comment._id}
							sortBy="top"
							relatedTo="comment"
						/>
					)}
				</Box>
			</Box>
		</Box>
	)
}
export default CommentView
