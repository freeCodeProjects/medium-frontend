import { Box, Container, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchBlog } from '../api/blogAPI'
import BlogPreview from '../components/blog/BlogPreview'
import BoldTypography from '../components/ui/BoldTypography'
import ErrorMessage from '../components/ui/ErrorMessage'
import Loader from '../components/ui/Loader'
import { AppContext } from '../context/AppContext'

const Search = () => {
	const { serverErrorHandler } = useContext(AppContext)
	const [searchParams] = useSearchParams()
	const { data, isLoading, isError } = useQuery(
		['searchBlog', searchParams.get('q')],
		() => searchBlog(searchParams.get('q')!),
		{
			onError: (error: any) => {
				console.log(error)
				serverErrorHandler(error)
			},
			staleTime: 10 * 60 * 1000
		}
	)

	return (
		<Container maxWidth="md" sx={{ mt: '2rem', mb: '1rem' }}>
			<BoldTypography variant="h5">Search Result</BoldTypography>
			<Box>
				{isLoading ? (
					<Loader />
				) : isError ? (
					<ErrorMessage message="Failed to fetch Blogs." />
				) : data.data.length > 0 ? (
					<Stack rowGap={2} sx={{ mt: '1rem' }}>
						{data.data.map((blog) => (
							<BlogPreview key={blog._id} blogPreview={blog} />
						))}
					</Stack>
				) : (
					'No blog found.'
				)}
			</Box>
		</Container>
	)
}
export default Search
