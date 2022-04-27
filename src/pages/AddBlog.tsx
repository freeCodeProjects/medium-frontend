import Editor from '../components/utils/Editor'
import { useState, useContext, useEffect } from 'react'
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined'
import { Box, Fab, TextField, Tooltip } from '@mui/material'
import { useMutation } from 'react-query'
import { AppContext } from '../context/AppContext'
import { addBlog } from '../api/blogAPI'
import { BlogEditorData, EditorData } from '../types/blogTypes'
import useDebounce from '../hooks/useDebounce'
import { useNavigate } from 'react-router-dom'

const AddBlog = () => {
	const navigate = useNavigate()
	const [title, setTitle] = useState('')
	const [editorData, setEditorData] = useState<EditorData | null>(null)
	const { serverErrorHandler, checkIsOnlineWrapper } = useContext(AppContext)

	const debouncedEditorValue = useDebounce(editorData, 100)

	const { mutate: addBlogHandler, isLoading } = useMutation(
		(data: BlogEditorData) => checkIsOnlineWrapper(() => addBlog(data)),
		{
			onError: (error: any) => {
				serverErrorHandler(error)
			},
			onSuccess: (data: any) => {
				navigate(`/update/${data.data.blog._id}`, { replace: true })
			}
		}
	)

	useEffect(() => {
		if (editorData && editorData.blocks.length > 0 && !isLoading) {
			addBlogHandler({ content: editorData!, title })
		}
	}, [debouncedEditorValue])

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
			<Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
				<TextField
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					fullWidth
					InputProps={{
						disableUnderline: true,
						sx: { fontSize: '2rem' }
					}}
					variant="standard"
					placeholder="Title"
					sx={{ maxWidth: 650, margin: '0 auto', border: 0 }}
				/>
				<Editor data={editorData} setData={setEditorData} />
			</Box>
		</Box>
	)
}

export default AddBlog
