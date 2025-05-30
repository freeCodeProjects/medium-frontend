import { Box, Typography } from '@mui/material'
import { BlogPreview as BlogPreviewType } from '../../types/blogTypes'
import BoldTypography from '../ui/BoldTypography'
import dayjs from 'dayjs'
import SmallChip from '../ui/SmallChip'
import Bookmark from '../ui/Bookmark'
import { useNavigate } from 'react-router-dom'
import Author from '../ui/Author'

type IProps = {
	blogPreview: BlogPreviewType
	showAuthor?: boolean
}

const BlogPreview = ({ blogPreview, showAuthor = true }: IProps) => {
	const navigate = useNavigate()

	const navigateToDetailPage = () => {
		navigate(`/blog/${blogPreview.slug}`)
	}

	return (
		<Box
			onClick={navigateToDetailPage}
			sx={{
				flex: 1,
				bgcolor: 'secondary.main',
				padding: '1rem',
				display: 'flex',
				justifyContent: 'space-between',
				gap: '0.5rem',
				cursor: 'pointer'
			}}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateRows: 'auto auto auto 1fr',
					gap: '0.35rem',
					overflow: 'hidden',
					width: '100%'
				}}>
				{showAuthor ? <Author userId={blogPreview.userId} /> : <div></div>}
				<BoldTypography className="truncate-2">
					{blogPreview.publishedTitle}
				</BoldTypography>

				<Typography className="truncate-2" variant="subtitle2">
					{blogPreview.subTitle}
				</Typography>
				<Box
					sx={{
						alignSelf: 'end',
						alignItems: 'center',
						display: 'grid',
						gridTemplateColumns: 'auto auto auto 1fr',
						gap: '0.5rem',
						overflowX: 'hidden',
						width: '100%'
					}}>
					<Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
						{dayjs(blogPreview.publishedAt).format('MMM D')}
					</Typography>
					<Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
						{blogPreview.readTime} read
					</Typography>
					{blogPreview.tags.length > 0 ? (
						<SmallChip label={blogPreview.tags[0]} />
					) : (
						<div></div>
					)}
					<Box sx={{ justifySelf: 'end' }}>
						<Bookmark blogId={blogPreview._id} />
					</Box>
				</Box>
			</Box>
			{blogPreview.previewImage && (
				<Box
					component="img"
					sx={{
						minWidth: 156,
						maxWidth: 156,
						height: 156,
						objectFit: 'cover',
						display: { xs: 'none', sm: 'block' }
					}}
					src={blogPreview.previewImage}
					alt={`${blogPreview.publishedTitle} image`}
					loading="lazy"
				/>
			)}
		</Box>
	)
}
export default BlogPreview
