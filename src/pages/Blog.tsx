import { Avatar, Box, Chip, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
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
import { useAppStore } from '../store/appStore'
import { getUserById, addBlogToPreviouslyRead } from '../api/userAPI'
import LinerLoader from '../components/ui/LinerLoader'
import UserName from '../components/ui/UserName'
import Comment from '../components/blog/Comment'

const Blog = () => {
	const params = useParams()
	const { isLoggedIn } = useAppStore()
	const [drawerToggle, setDrawerToggle] = useState(false)

	const { serverErrorHandler } = useContext(AppContext)

	const {
		isLoading,
		isError,
		isFetching,
		data: blog
	} = useQuery(['blogBySlug', params.slug], () => getBlogBySlug(params.slug!), {
		onError: (error: any) => {
			console.log(error)
			serverErrorHandler(error)
		},
		refetchOnMount: 'always'
	})

	const { mutate: addToPreviouslyRead } = useMutation(() =>
		addBlogToPreviouslyRead(blog!.data._id)
	)

	const userId = blog?.data.userId
	// Then get the user's projects
	const { data: author } = useQuery(
		['userById', userId],
		() => getUserById(userId!),
		{
			// The query will not execute until the userId exists
			enabled: !!userId
		}
	)

	useEffect(() => {
		// update the previoulsy read
		if (!isFetching && isLoggedIn && blog?.data?._id) {
			addToPreviouslyRead()
		}
	}, [blog])

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
						}}
					>
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
							}}
						>
							<Box
								sx={{
									padding: '1rem',
									display: 'flex',
									gap: { xs: '1rem', md: '0.5rem' },
									flexDirection: { md: 'column' },
									alignItems: 'center'
								}}
							>
								<Avatar
									alt={author?.data.name}
									src={author?.data.photo}
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
									}}
								>
									<UserName
										name={author?.data.name!}
										userName={author?.data.userName!}
									/>
									<Typography
										variant="subtitle2"
										sx={{ textAlign: { md: 'center' } }}
									>
										{author?.data.bio}
									</Typography>
									<Box
										sx={{
											display: 'flex',
											justifyContent: { xs: 'space-between' },
											flexDirection: { md: 'column' },
											flexWrap: 'wrap',
											gap: '0.5rem',
											alignItems: 'center'
										}}
									>
										<BoldTypography>{`${author?.data.followerCount} followers`}</BoldTypography>
										<FollowButton userId={author?.data._id!} />
									</Box>
								</Box>
							</Box>
							<Box
								sx={{
									display: 'flex',
									gap: '0.5rem',
									width: '100%',
									justifyContent: { xs: 'space-between', md: 'space-evenly' }
								}}
							>
								{!isFetching ? (
									<ClapButton
										postId={blog.data._id}
										claps={blog.data.clapsCount}
										authorId={author?.data._id || ''}
										relatedTo="blog"
									/>
								) : (
									<Box
										sx={{
											width: '36px'
										}}
									>
										<LinerLoader />
									</Box>
								)}
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<CommentButton onClick={() => setDrawerToggle(true)} />
									{blog?.data.responsesCount}
								</Box>
								<Bookmark blogId={blog.data._id!} />
							</Box>
						</Box>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								flex: 1,
								marginLeft: { md: '240px' }
							}}
						>
							<Box
								sx={{
									width: 'min(100%, 650px)',
									display: 'flex',
									gap: '0.5rem',
									flexDirection: 'column',
									alignItems: 'start'
								}}
							>
								<Box
									sx={{
										display: 'flex',
										gap: '1rem'
									}}
								>
									<Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
										{dayjs(blog?.data.publishedAt).format('DD MMM, YYYY')}
									</Typography>
									<Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
										{blog?.data.readTime} read
									</Typography>
								</Box>
								<Typography variant="h4">
									{blog?.data.publishedTitle}
								</Typography>
								<Editor data={blog?.data.publishedContent} readOnly={true} />
								<Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
									{blog?.data.tags.map((tag, index) => (
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
						<Comment
							drawerToggle={drawerToggle}
							closeDrawer={() => setDrawerToggle(false)}
							postId={blog.data._id}
							responsesCount={blog.data.responsesCount}
						/>
					</Box>
				)
			)}
		</Box>
	)
}
export default Blog
