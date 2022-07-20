import { Avatar, Box, Chip, Typography } from '@mui/material'
import { useContext } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getBlogBySlug } from '../api/blogAPI'
import Loader from '../components/ui/Loader'
import { AppContext } from '../context/AppContext'
import NotFound from '../components/ui/NotFound'
import Editor from '../components/blog/Editor'
import dayjs from 'dayjs'
import BoldTypography from '../components/ui/BoldTypography'
import FollowButton from '../components/ui/FollowButton'
import ClapButton from '../components/ui/ClapButton'
import CommentButton from '../components/ui/CommentButton'
import Bookmark from '../components/ui/Bookmark'

const Blog = () => {
	const params = useParams()

	const { serverErrorHandler } = useContext(AppContext)

	const { isLoading, isError, data } = useQuery(
		['blogBySlug', params.slug],
		() => getBlogBySlug(params.slug!),
		{
			onError: (error: any) => {
				console.log(error)
				serverErrorHandler(error)
			},
			staleTime: 0
		}
	)

	const blog = data ? data.data : null

	return (
		<Box sx={{ height: '100%' }}>
			{isLoading ? (
				<Loader />
			) : isError ? (
				<NotFound message="Blog Not found." />
			) : (
				blog && (
					<Box
						sx={{
							display: 'flex',
							paddingY: '1rem',
							flexDirection: { xs: 'column-reverse', md: 'unset' }
						}}>
						<Box
							sx={{
								display: 'flex',
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
								position: { md: 'fixed' },
								top: 64,
								bottom: 64,
								maxWidth: { xs: '650px', md: '240px' },
								alignSelf: 'center',
								flexDirection: { xs: 'column-reverse', md: 'column' }
							}}>
							<Box
								sx={{
									padding: '1rem',
									display: 'flex',
									gap: { xs: '1rem', md: '0.5rem' },
									flexDirection: { md: 'column' },
									alignItems: 'center'
								}}>
								<Avatar
									alt={blog?.user.name}
									src={blog?.user.photo}
									sx={{
										width: { xs: 64, sm: 120 },
										height: { xs: 64, sm: 120 },
										alignSelf: { xs: 'start', md: 'center' }
									}}
								/>
								<Box
									sx={{
										display: 'flex',
										gap: '0.5rem',
										flexDirection: 'column',
										alignItems: { md: 'center' }
									}}>
									<BoldTypography>{blog?.user.name!}</BoldTypography>
									<Typography
										variant="subtitle2"
										sx={{ textAlign: { md: 'center' } }}>
										{blog?.user.bio}
									</Typography>
									<Box
										sx={{
											display: 'flex',
											justifyContent: { xs: 'space-between' },
											flexDirection: { md: 'column' },
											flexWrap: 'wrap',
											gap: '0.5rem',
											alignItems: 'center'
										}}>
										<BoldTypography>{`${blog?.user.followerCount} followers`}</BoldTypography>
										<FollowButton />
									</Box>
								</Box>
							</Box>
							<Box
								sx={{
									display: 'flex',
									gap: '0.5rem',
									width: '100%',
									justifyContent: { xs: 'space-between', md: 'space-evenly' }
								}}>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<ClapButton />
									{blog?.clapsCount}
								</Box>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<CommentButton />
									{blog?.responsesCount}
								</Box>
								<Bookmark blogId={blog._id!} />
							</Box>
						</Box>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								flex: 1,
								marginLeft: { md: '240px' }
							}}>
							<Box
								sx={{
									maxWidth: '650px',
									display: 'flex',
									gap: '0.5rem',
									flexDirection: 'column'
								}}>
								<Box sx={{ display: 'flex', gap: '1rem' }}>
									<Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
										{dayjs(blog?.publishedAt).format('DD MMM, YYYY')}
									</Typography>
									<Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
										{blog?.readTime} read
									</Typography>
								</Box>
								<Typography variant="h4">{blog?.publishedTitle}</Typography>
								<Editor data={blog?.publishedContent} readOnly={true} />
								<Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
									{blog?.tags.map((tag, index) => (
										<Chip label={tag} key={index} />
									))}
								</Box>
								<Box
									component="hr"
									sx={{
										width: '100%',
										display: { xs: 'block', md: 'none' },
										opacity: '30%'
									}}
								/>
							</Box>
						</Box>
					</Box>
				)
			)}
		</Box>
	)
}
export default Blog
