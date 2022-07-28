import { Box } from '@mui/material'
import TrendingUpSharpIcon from '@mui/icons-material/TrendingUpSharp'
import { useQuery } from '@tanstack/react-query'
import { getTrendingBlog } from '../../api/blogAPI'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import Loader from '../ui/Loader'
import ErrorMessage from '../ui/ErrorMessage'
import BlogPreview from '../blog/BlogPreview'
import BoldTypography from '../ui/BoldTypography'

const TrendingBlog = () => {
	const { serverErrorHandler } = useContext(AppContext)

	const {
		isLoading,
		isError,
		data: trendingBlogs
	} = useQuery(['trending-stories'], getTrendingBlog, {
		onError: (error: any) => {
			console.log(error)
			serverErrorHandler(error)
		},
		staleTime: 10 * 60 * 1000
	})

	return (
		<Box
			sx={{
				marginY: '2rem'
			}}>
			<Box
				sx={{
					display: 'flex',
					gap: '0.5rem'
				}}>
				<TrendingUpSharpIcon />
				<BoldTypography>Trending Stories</BoldTypography>
			</Box>
			{isLoading ? (
				<Loader />
			) : isError ? (
				<ErrorMessage message="Failed to fetch Blogs." />
			) : (
				<Box
					sx={{
						marginTop: '1rem',
						display: 'grid',
						gap: '1rem',
						gridTemplateColumns: {
							xs: 'repeat(auto-fit, minmax(18rem, 1fr))',
							sm: 'repeat(auto-fit, minmax(30rem, 1fr))'
						},
						justifyContent: 'center'
					}}>
					{trendingBlogs &&
						trendingBlogs.data.map((blog) => (
							<BlogPreview key={blog._id} blogPreview={blog} />
						))}
				</Box>
			)}
		</Box>
	)
}
export default TrendingBlog
