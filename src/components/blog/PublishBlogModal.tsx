import {
	DialogContent,
	Dialog,
	Button,
	DialogActions,
	Slide,
	DialogTitle,
	Box,
	TextField,
	Typography,
	Stack,
	Chip
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import {
	forwardRef,
	useState,
	useEffect,
	KeyboardEvent,
	useContext
} from 'react'
import { LoadingButton } from '@mui/lab'
import { Input } from '@mui/material'
import { EditorData } from '../../types/blogTypes'
import { useMutation } from '@tanstack/react-query'
import { AppContext } from '../../context/AppContext'
import { publishBlog } from '../../api/blogAPI'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/appStore'

type IProps = {
	openPublishBlogModal: boolean
	handleClosePublishBlogModal: () => void
	editorData: EditorData | null
	title: string
	tags: string[]
}

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />
})

const MAX_TITLE_LENGTH = 100
const MAX_SUBTITLE_LENGTH = 200

const PublishBlogModal = ({
	openPublishBlogModal,
	handleClosePublishBlogModal,
	editorData,
	title: blogTitle,
	tags: blogTags
}: IProps) => {
	const { serverErrorHandler } = useContext(AppContext)
	const { setAlertData } = useAppStore()
	const { id: blogId } = useParams()
	const navigate = useNavigate()

	const getSubTitle = (subString: string) => {
		const cleanSubTitle = subString
			.replace(/<\/?[^>]+(>|$)|/g, '')
			.replaceAll('&nbsp;', ' ')
		return cleanSubTitle.length >= MAX_SUBTITLE_LENGTH
			? cleanSubTitle.substring(0, MAX_SUBTITLE_LENGTH)
			: cleanSubTitle
	}

	const getTitle = (title: string) => {
		return title.length >= MAX_TITLE_LENGTH
			? title.substring(0, MAX_TITLE_LENGTH)
			: title
	}

	const [previewImage, setPreviewImage] = useState('')
	const [title, setTitle] = useState('')
	const [subTitle, setSubTitle] = useState('')
	const [currTag, setCurrTag] = useState('')
	const [tags, setTags] = useState<string[]>([])

	const { mutate, isLoading } = useMutation(
		() =>
			publishBlog(blogId!, {
				title,
				content: editorData,
				subTitle: subTitle,
				tags: tags,
				previewImage
			}),
		{
			onError: (error: any) => {
				serverErrorHandler(error)
			},
			onSuccess: (data: any) => {
				setAlertData('Blog Published!')
				navigate(-1)
			}
		}
	)

	useEffect(() => {
		setTitle(getTitle(blogTitle))
	}, [blogTitle])

	useEffect(() => {
		setTags(blogTags)
	}, [blogTags])

	useEffect(() => {
		setSubTitle('')
		setPreviewImage('')
		if (editorData) {
			for (let block of editorData?.blocks) {
				if (block.type === 'paragraph') {
					//replace html tags from string
					setSubTitle(getSubTitle(block.data.text))
					break
				}
			}

			for (let block of editorData?.blocks) {
				if (block.type === 'image') {
					setPreviewImage(block.data.file.url)
					break
				} else if (block.type === 'inlineImage') {
					setPreviewImage(block.data.url)
					break
				}
			}
		}
	}, [editorData])

	const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			const newTag = currTag.trim()
			if (newTag) {
				setTags((oldState) => [...oldState, newTag])
			}
			setCurrTag('')
		}
	}

	return (
		<div>
			<Dialog
				PaperProps={{
					sx: {
						height: '90%'
					}
				}}
				maxWidth="sm"
				fullWidth
				open={openPublishBlogModal}
				TransitionComponent={Transition}
				keepMounted
				onClose={(event, reason) => {
					if (reason && reason == 'backdropClick') return
					handleClosePublishBlogModal()
				}}>
				<DialogTitle>{'Story Preview'}</DialogTitle>
				<DialogContent
					dividers
					sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<Box
						sx={{
							minHeight: '240px',
							width: '100%'
						}}>
						{!previewImage ? (
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
									backgroundColor: 'action.selected'
								}}>
								<Typography
									sx={{ textAlign: 'center', width: 360 }}
									variant="body1"
									component="div">
									Include a high-quality image in your story to make it more
									inviting to readers.
								</Typography>
							</Box>
						) : (
							<img
								style={{
									height: '100%',
									width: '100%',
									objectFit: 'cover'
								}}
								src={previewImage}
							/>
						)}
					</Box>
					<TextField
						autoComplete="off"
						fullWidth
						inputProps={{
							maxLength: MAX_TITLE_LENGTH
						}}
						helperText={`${title.length}/${MAX_TITLE_LENGTH}`}
						label="Title"
						variant="standard"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<TextField
						autoComplete="off"
						fullWidth
						multiline
						maxRows={6}
						inputProps={{
							maxLength: MAX_SUBTITLE_LENGTH
						}}
						helperText={`${subTitle.length}/${MAX_SUBTITLE_LENGTH}`}
						label="Sub Title"
						variant="standard"
						value={subTitle}
						onChange={(e) => setSubTitle(e.target.value)}
					/>
					<Box>
						<Typography variant="subtitle1" gutterBottom component="div">
							Add or change tags (up to 5) so readers know what your story is
							about.
						</Typography>
						<Input
							autoComplete="off"
							disabled={tags.length >= 5}
							fullWidth
							placeholder="tag"
							value={currTag}
							onChange={(e) => setCurrTag(e.target.value)}
							onKeyDown={handleKeyUp}
						/>
					</Box>
					<Stack direction="row" flexWrap="wrap" gap={1}>
						{tags.map((tag, index) => (
							<Chip
								key={index}
								label={tag}
								variant="outlined"
								onDelete={() => setTags(tags.filter((_, idx) => index != idx))}
							/>
						))}
					</Stack>
				</DialogContent>
				<DialogActions style={{}}>
					<Button onClick={handleClosePublishBlogModal} color="inherit">
						Close
					</Button>
					<LoadingButton
						onClick={() => mutate()}
						loading={isLoading}
						type="submit"
						color="success"
						variant="outlined">
						Publish
					</LoadingButton>
				</DialogActions>
			</Dialog>
		</div>
	)
}
export default PublishBlogModal
