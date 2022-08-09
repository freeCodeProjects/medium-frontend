import { Avatar, Box, Typography } from '@mui/material'
import { BlogPreview as BlogPreviewType } from '../../types/blogTypes'
import BoldTypography from '../ui/BoldTypography'
import dayjs from 'dayjs'
import SmallChip from '../ui/SmallChip'
import Bookmark from '../ui/Bookmark'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUserById } from '../../api/userAPI'
import UserInfoPopup from '../ui/UserInfoPopup'

type IProps = {
	blogPreview: BlogPreviewType
}

const BlogPreview = ({ blogPreview }: IProps) => {
	const navigate = useNavigate()

	const { data: author } = useQuery(['userById', blogPreview.userId], () =>
		getUserById(blogPreview.userId)
	)

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
				{author && (
					<UserInfoPopup author={author.data}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: '0.5rem',
								width: 'min-content'
							}}>
							<Avatar
								sx={{ width: 24, height: 24 }}
								alt={author.data.name}
								src={author.data.photo}
							/>
							<BoldTypography className="truncate" variant="subtitle2">
								{author.data.name}
							</BoldTypography>
						</Box>
					</UserInfoPopup>
				)}
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
					alt={blogPreview.publishedTitle}
					loading="lazy"
				/>
			)}
		</Box>
	)
}
export default BlogPreview
