import Editor from '../components/blog/Editor'
import { useState, useContext, useEffect } from 'react'
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined'
import { Box, Fab, Tooltip } from '@mui/material'
import { useMutation, useQuery } from 'react-query'
import { AppContext } from '../context/AppContext'
import { getBlog, updateBlog } from '../api/blogAPI'
import { BlogEditorData, Blog, EditorData } from '../types/blogTypes'
import useDebounce from '../hooks/useDebounce'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import NotFound from '../components/ui/NotFound'
import BlogTitle from '../components/blog/BlogTitle'

type LocationStateData = {
	title: string
	editorData: EditorData
	blogData: Partial<Blog>
}

const UpdateBlog = () => {
	const params = useParams()
	const navigate = useNavigate()
	const location = useLocation()

	const [editorData, setEditorData] = useState<EditorData | null>(null)
	const [title, setTitle] = useState('')
	const [blogData, setBlogData] = useState<Partial<Blog>>({})
	const [error, setError] = useState(false)
	const { serverErrorHandler, checkIsOnlineWrapper } = useContext(AppContext)

	const debouncedTitleValue = useDebounce(title, 2000)
	const debouncedEditorValue = useDebounce(editorData, 5000)

	const { refetch: fetchBlogDataHandler } = useQuery(
		['blog', params.id],
		() => getBlog(params.id!),
		{
			refetchOnMount: 'always',
			enabled: false,
			onError: (error: any) => {
				setError(true)
			},
			onSuccess: (data: any) => {
				const blog = data.data.blog
				setBlogData(blog)
				setEditorData(blog.content)
				setTitle(blog.title)
			}
		}
	)

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
		const state: LocationStateData | null = location.state as LocationStateData
		if (state) {
			setBlogData(state.blogData)
			setEditorData(state.editorData)
			setTitle(state.title)
			// Clear the state after
			navigate(location.pathname, { replace: true })
		} else {
			fetchBlogDataHandler()
		}
	}, [])

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
					<BlogTitle title={title} setTitle={setTitle} />
					<Editor data={editorData} setData={setEditorData} isFocus />
				</Box>
			</Box>
		)
	) : (
		<NotFound message={'Blog not Found.'} />
	)
}

export default UpdateBlog
