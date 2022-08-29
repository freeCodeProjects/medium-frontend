import { Box, Stack } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useContext, useEffect, useRef } from 'react'
import { getUserPublicBlogs } from '../../api/blogAPI'
import { AppContext } from '../../context/AppContext'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import BlogPreview from '../blog/BlogPreview'
import ErrorMessage from '../ui/ErrorMessage'
import Loader from '../ui/Loader'

const GetUserPublicBlogs = ({ userId }: { userId: string }) => {
	const { serverErrorHandler } = useContext(AppContext)
	const tempRef = useRef<HTMLDivElement>(null)
	const loadMore = useIntersectionObserver(tempRef)

	useEffect(() => {
		if (loadMore) {
			fetchNextPage()
		}
	}, [loadMore])

	const {
		isLoading,
		isError,
		data,
		isFetching,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	} = useInfiniteQuery(
		[`userPublicBlogs-${userId}`],
		({ pageParam = '' }) => getUserPublicBlogs(pageParam, userId),
		{
			onError: (error: any) => {
				console.log(error)
				serverErrorHandler(error)
			},
			getNextPageParam: (lastPage, pages) =>
				lastPage.data.length ===
				parseInt(import.meta.env.VITE_NUMBER_OF_DOCUMENT_PER_REQUEST)
					? lastPage.data[lastPage.data.length - 1].publishedAt
					: undefined,
			refetchOnMount: 'always'
		}
	)

	return (
		<Box>
			{isLoading ? (
				<Loader />
			) : isError ? (
				<ErrorMessage message="Failed to fetch Blogs." />
			) : data.pages[0].data.length > 0 ? (
				<Stack gap={2}>
					{data.pages.map((group, i) => (
						<Stack key={i} gap={2}>
							{group.data.map((blog) => (
								<BlogPreview
									key={blog._id}
									blogPreview={blog}
									showAuthor={false}
								/>
							))}
						</Stack>
					))}
				</Stack>
			) : (
				'No blog found.'
			)}
			{isFetchingNextPage && <Loader />}
			{!isFetching && hasNextPage && <div ref={tempRef}></div>}
		</Box>
	)
}
export default GetUserPublicBlogs
