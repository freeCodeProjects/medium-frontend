import Editor from '../components/editor/Editor'
import { useState } from 'react'
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined'
import { Box, Fab, Tooltip } from '@mui/material'

type IProps = {
	newBlog: boolean
}

const AddOrUpdateBlog = ({ newBlog }: IProps) => {
	const [editorData, setEditorData] = useState<object>({
		time: 1651003174437,
		blocks: [
			{ id: 'qNGBQh9ovY', type: 'paragraph', data: { text: 'a' } },
			{ id: 'OHfOfvZwse', type: 'paragraph', data: { text: 'a' } },
			{ id: 'fR9SQ14w5x', type: 'paragraph', data: { text: 'a' } },
			{ id: '-DUC3olp-v', type: 'paragraph', data: { text: 'a' } },
			{ id: '0LQ-DgDAMb', type: 'paragraph', data: { text: 'a' } },
			{ id: 'OLasP6VDJG', type: 'paragraph', data: { text: 'a' } },
			{ id: 'JO9b0rkvQF', type: 'paragraph', data: { text: 'a' } },
			{ id: 'pPzDmWNTSt', type: 'paragraph', data: { text: 'a' } },
			{ id: 'QSOdRXrpJN', type: 'paragraph', data: { text: 'a' } },
			{ id: '1vZSWrXhK7', type: 'paragraph', data: { text: 'a' } },
			{ id: 'o0Taqm0-Ed', type: 'paragraph', data: { text: 'a' } },
			{ id: '39ndSOPfrK', type: 'paragraph', data: { text: 'a' } },
			{ id: '62u0hz-rJM', type: 'paragraph', data: { text: 'a' } },
			{ id: '2uiut8Lg77', type: 'paragraph', data: { text: 'a' } },
			{ id: 'yDivFZkJXw', type: 'paragraph', data: { text: 'a' } },
			{ id: '79r1pmUmV-', type: 'paragraph', data: { text: 'a' } },
			{ id: 'LyKmLwXXJG', type: 'paragraph', data: { text: 'a' } },
			{ id: 'foTW7Lc3er', type: 'paragraph', data: { text: 'a' } },
			{ id: 'A6TsGf1VUZ', type: 'paragraph', data: { text: 'aa' } }
		],
		version: '2.23.2'
	})

	return (
		<Box
			sx={{
				position: 'relative'
			}}>
			<Tooltip title="Publish">
				<Fab
					color="secondary"
					size="small"
					sx={{ position: 'sticky', top: 12, float: 'right' }}>
					<PublishOutlinedIcon />
				</Fab>
			</Tooltip>
			<Editor data={editorData} />
		</Box>
	)
}
export default AddOrUpdateBlog
