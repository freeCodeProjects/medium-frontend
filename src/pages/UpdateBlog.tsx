import Editor from '../components/utils/Editor'
import { useState, useContext, useEffect } from 'react'
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined'
import { Box, Fab, TextField, Tooltip } from '@mui/material'
import { useMutation, useQuery } from 'react-query'
import { AppContext } from '../context/AppContext'
import { getBlog, updateBlog } from '../api/blogAPI'
import { BlogEditorData, Blog, EditorData } from '../types/blogTypes'
import useDebounce from '../hooks/useDebounce'
import { useParams } from 'react-router-dom'
import NotFound from '../components/ui/NotFound'

const UpdateBlog = () => {
	const params = useParams()
	const [editorData, setEditorData] = useState<EditorData | null>(null)
	const [title, setTitle] = useState('')
	const [blogData, setBlogData] = useState<Partial<Blog>>({})
	const [error, setError] = useState(false)
	const { serverErrorHandler, checkIsOnlineWrapper } = useContext(AppContext)

	const debouncedTitleValue = useDebounce(title, 2000)
	const debouncedEditorValue = useDebounce(editorData, 2000)

	useQuery(['blog', params.id], () => getBlog(params.id!), {
		refetchOnMount: 'always',
		onError: (error: any) => {
			setError(true)
		},
		onSuccess: (data: any) => {
			const blog = data.data.blog
			setBlogData(blog)
			setEditorData(blog.content)
			setTitle(blog.title)
		}
	})

	const { mutate: updateBlogHandler, isLoading } = useMutation(
		(data: BlogEditorData) =>
			checkIsOnlineWrapper(() => updateBlog(blogData._id!, data)),
		{
			onError: (error: any) => {
				serverErrorHandler(error)
			},
			onSuccess: (data: any) => {
				setBlogData(data.data.blog)
			}
		}
	)

	useEffect(() => {
		if (editorData && editorData.blocks.length > 0 && !isLoading) {
			updateBlogHandler({ content: editorData!, title })
		}
	}, [debouncedEditorValue, debouncedTitleValue])

	return !error ? (
		editorData && (
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
					<Editor data={editorData} setData={setEditorData} isFocus />
				</Box>
			</Box>
		)
	) : (
		<NotFound message={'Blog not Found.'} />
	)
}

export default UpdateBlog
