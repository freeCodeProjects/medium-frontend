import { Avatar, Box, Typography } from '@mui/material'
import { BlogWithUserData } from '../../types/blogTypes'
import BoldTypography from '../ui/BoldTypography'
import dayjs from 'dayjs'
import SmallChip from '../ui/SmallChip'
import Bookmark from '../ui/Bookmark'
import { Link, useNavigate } from 'react-router-dom'

type IProps = {
	blogPreview: BlogWithUserData
}

const BlogPreview = ({ blogPreview }: IProps) => {
	const navigate = useNavigate()

	return (
		<Link
			to={`/blog/${blogPreview.slug}`}
			className="link"
			style={{ height: '100%', display: 'flex' }}>
			<Box
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
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: '0.5rem'
						}}>
						<Avatar
							sx={{ width: 24, height: 24 }}
							alt={blogPreview.user.name}
							src={blogPreview.user.photo}
						/>
						<BoldTypography className="truncate-2" variant="subtitle2">
							{blogPreview.user.name}
						</BoldTypography>
					</Box>
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
							<Bookmark />
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
		</Link>
	)
}
export default BlogPreview
