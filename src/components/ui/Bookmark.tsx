import { TurnedInNotSharp } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

const Bookmark = () => {
	const addToBookmark = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		console.log('add to bookmark')
	}

	return (
		<div>
			<Tooltip title="Add to bookmark">
				<IconButton aria-label="delete" onClick={addToBookmark}>
					<TurnedInNotSharp />
				</IconButton>
			</Tooltip>
		</div>
	)
}
export default Bookmark
