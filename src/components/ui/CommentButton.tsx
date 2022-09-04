import { IconButton } from '@mui/material'
import { MouseEventHandler } from 'react'
import CommentIcon from './CommentIcon'

const CommentButton = ({
	onClick
}: {
	onClick: MouseEventHandler<HTMLDivElement>
}) => {
	return (
		<div onClick={onClick}>
			<IconButton aria-label="comment">
				<CommentIcon />
			</IconButton>
		</div>
	)
}
export default CommentButton
