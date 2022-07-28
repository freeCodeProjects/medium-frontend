import Editor from '../components/blog/Editor'
import { useState, useContext, useEffect } from 'react'
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined'
import { Box, Fab, Tooltip } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AppContext } from '../context/AppContext'
import { addBlog, getBlog, updateBlog } from '../api/blogAPI'
import { BlogEditorData, Blog, EditorData } from '../types/blogTypes'
import useDebounce from '../hooks/useDebounce'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import NotFound from '../components/ui/NotFound'
import BlogTitle from '../components/blog/BlogTitle'
import PublishBlogModal from '../components/blog/PublishBlogModal'

const AddorUpdateBlog = () => {
	const params = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const { serverErrorHandler, checkIsOnlineWrapper } = useContext(AppContext)

	const [editorData, setEditorData] = useState<EditorData | null>(null)
	const [title, setTitle] = useState('')
	const [blogData, setBlogData] = useState<Blog | null>(null)
	const [error, setError] = useState(false)
	const [openPublishBlogModal, setOpenPublishBlogModal] = useState(false)
	const [tags, setTags] = useState<string[]>([])
	const [isPublished, setIsPublished] = useState(false)
	const [isAddPage, setIsAddPage] = useState(location.pathname === '/add')
	const [isRouteChanged, setIsRouteChanged] = useState(false)
	const [canReset, setCanReset] = useState(true)

	let debouncedTitleValue = useDebounce(title, 500)
	let debouncedEditorValue = useDebounce(editorData, 500)

	const reset = () => {
		setEditorData(null)
		setTitle('')
		setBlogData(null)
		setError(false)
		setOpenPublishBlogModal(false)
		setTags([])
		setIsPublished(false)
		setIsAddPage(location.pathname === '/add')
		setIsRouteChanged(true)
	}

	// since we are using single component for add and update blog we reset state on route change
	useEffect(() => {
		//we don't reset when we internally navigate to update route after adding blog for first time
		if (canReset) {
			reset()
		} else {
			setCanReset(true)
		}
	}, [location.pathname])

	useEffect(() => {
		setIsRouteChanged(false)
		if (!isAddPage) {
			fetchBlogDataHandler()
		} else {
			setEditorData({ time: 0, blocks: [], version: '' })
		}
	}, [isRouteChanged])

	useEffect(() => {
		if (editorData && editorData.blocks.length > 0) {
			if (isAddPage && !isAddingBlog) {
				addBlogHandler({ content: editorData!, title })
			} else if (!isUpdatingBlog) {
				updateBlogHandler({ content: editorData!, title })
			}
		}
	}, [debouncedEditorValue, debouncedTitleValue])

	const handleOpenPublishBlogModal = () => {
		setOpenPublishBlogModal(true)
	}

	const handleClosePublishBlogModal = () => {
		setOpenPublishBlogModal(false)
	}

	const { refetch: fetchBlogDataHandler } = useQuery(
		['blog', params.id],
		() => getBlog(params.id!),
		{
			refetchOnMount: 'always',
			enabled: false,
			onError: (error: any) => {
				serverErrorHandler(error)
				setError(true)
			},
			onSuccess: (data: any) => {
				const blog: Blog = data.data.blog
				setBlogData(blog)
				setEditorData(blog.content)
				setTitle(blog.title)
				setTags(blog.tags)
				setIsPublished(blog.isPublished)
			}
		}
	)

	const { mutate: addBlogHandler, isLoading: isAddingBlog } = useMutation(
		(data: BlogEditorData) => checkIsOnlineWrapper(() => addBlog(data)),
		{
			onError: (error: any) => {
				serverErrorHandler(error)
			},
			onSuccess: (data: any) => {
				const blog = data.data.blog
				setBlogData(blog)
				setCanReset(false)
				navigate(`/update/${blog._id}`, { replace: true })
				setIsAddPage(false)
			}
		}
	)

	const { mutate: updateBlogHandler, isLoading: isUpdatingBlog } = useMutation(
		(data: BlogEditorData) =>
			checkIsOnlineWrapper(() => updateBlog(blogData!._id!, data)),
		{
			onError: (error: any) => {
				serverErrorHandler(error)
			},
			onSuccess: (data: any) => {
				setBlogData(data.data.blog)
			}
		}
	)

	return !error ? (
		<Box
			sx={{
				position: 'relative'
			}}>
			{blogData && (
				<Tooltip title={isPublished ? 'Save and Publish' : 'Publish'}>
					<Fab
						color="secondary"
						size="small"
						sx={{
							position: 'fixed',
							bottom: '2rem',
							right: {
								xs: '1rem',
								md: '2rem'
							}
						}}>
						<PublishOutlinedIcon
							sx={{
								width: '80%',
								height: '80%',
								padding: '0.25rem'
							}}
							onClick={handleOpenPublishBlogModal}
						/>
					</Fab>
				</Tooltip>
			)}
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					mt: '1rem'
				}}>
				<BlogTitle title={title} setTitle={setTitle} />
				{editorData && <Editor data={editorData} setData={setEditorData} />}
			</Box>
			<PublishBlogModal
				openPublishBlogModal={openPublishBlogModal}
				handleClosePublishBlogModal={handleClosePublishBlogModal}
				title={title}
				editorData={editorData}
				tags={tags}
			/>
		</Box>
	) : (
		<NotFound message={'Blog not Found.'} />
	)
}

export default AddorUpdateBlog
