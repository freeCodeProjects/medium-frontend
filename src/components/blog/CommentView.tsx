import { Box, Typography } from '@mui/material'
import { Comment } from '../../types/commentTypes'
import Author from '../ui/Author'

type IProps = {
	comment: Comment
}

const CommentView = ({ comment }: IProps) => {
	return (
		<Box sx={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
			<Author userId={comment.userId} date={comment.createdAt} />
			<Typography>{comment.comment}</Typography>
		</Box>
	)
}
export default CommentView
