import { Box } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Fragment, useContext, useEffect, useRef } from 'react'
import { getUserBlogs } from '../../api/blogAPI'
import { AppContext } from '../../context/AppContext'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import ErrorMessage from '../ui/ErrorMessage'
import Loader from '../ui/Loader'
import BlogCard from './BlogCard'

const GetStories = ({ isPublished }: { isPublished: boolean }) => {
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
		[`${isPublished ? 'published' : 'draft'}-stories`],
		({ pageParam = '' }) => getUserBlogs(pageParam, isPublished),
		{
			onError: (error: any) => {
				console.log(error)
				serverErrorHandler(error)
			},
			getNextPageParam: (lastPage, pages) =>
				lastPage.data.length ===
				parseInt(import.meta.env.VITE_NUMBER_OF_DOCUMENT_PER_REQUEST)
					? lastPage.data[lastPage.data.length - 1].updatedAt
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
				data.pages.map((group, i) => (
					<Fragment key={i}>
						{group.data.map((blog) => (
							<BlogCard key={blog._id} blog={blog} />
						))}
					</Fragment>
				))
			) : (
				'No blog found.'
			)}
			{isFetchingNextPage && <Loader />}
			{!isFetching && hasNextPage && <div ref={tempRef}></div>}
		</Box>
	)
}
export default GetStories
