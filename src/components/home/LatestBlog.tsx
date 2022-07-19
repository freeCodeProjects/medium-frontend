import BoldTypography from '../ui/BoldTypography'
import { Box, Button } from '@mui/material'
import { Fragment, useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { useInfiniteQuery } from 'react-query'
import { getLatestBlog } from '../../api/blogAPI'
import Loader from '../ui/Loader'
import ErrorMessage from '../ui/ErrorMessage'
import BlogPreview from '../blog/BlogPreview'

const LatestBlog = () => {
	const { serverErrorHandler } = useContext(AppContext)

	const {
		isLoading,
		isError,
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	} = useInfiniteQuery(
		['latest-stories'],
		({ pageParam = '' }) => getLatestBlog(pageParam),
		{
			onError: (error: any) => {
				console.log(error)
				serverErrorHandler(error)
			},
			getNextPageParam: (lastPage, pages) =>
				lastPage.data.length ===
					parseInt(import.meta.env.VITE_NUMBER_OF_DOCUMENT_PER_REQUEST) &&
				lastPage.data[lastPage.data.length - 1].publishedAt,
			staleTime: 0
		}
	)

	return (
		<Box sx={{ marginY: '2rem' }}>
			<BoldTypography>Latest Stories</BoldTypography>
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
					{data.pages.map((group, i) => (
						<Fragment key={i}>
							{group.data.map((blog) => (
								<BlogPreview key={blog._id} blogPreview={blog} />
							))}
						</Fragment>
					))}
				</Box>
			)}
			<div>
				{isFetchingNextPage ? (
					<Loader />
				) : (
					hasNextPage && (
						<Button
							sx={{ width: '100%', mt: '1rem' }}
							onClick={() => fetchNextPage()}>
							Load More
						</Button>
					)
				)}
			</div>
		</Box>
	)
}
export default LatestBlog
