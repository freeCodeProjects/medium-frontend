import { Avatar, Box, Typography } from '@mui/material'
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
			}
		}
	)

	const blog = data ? data.data : null

	return (
		<Box>
			{isLoading ? (
				<Loader />
			) : isError ? (
				<NotFound message="Blog Not found." />
			) : (
				<Box
					sx={{
						display: 'flex',
						paddingY: '1rem'
					}}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							height: '96%',
							position: 'fixed',
							top: 0,
							width: '240px'
						}}>
						<Box
							sx={{
								padding: '1rem',
								display: 'flex',
								gap: '0.5rem',
								flexDirection: 'column',
								alignItems: 'center'
							}}>
							<Avatar
								alt={blog?.user.name}
								src={blog?.user.photo}
								sx={{ width: 120, height: 120 }}
							/>
							<BoldTypography>{blog?.user.name!}</BoldTypography>
							<Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
								{blog?.user.bio}
							</Typography>
							<BoldTypography>{`${blog?.user.followerCount} followers`}</BoldTypography>
						</Box>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							flex: 1,
							marginLeft: '240px'
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
						</Box>
					</Box>
				</Box>
			)}
		</Box>
	)
}
export default Blog
