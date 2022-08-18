import { Box } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { getDraftBlog } from '../../api/blogAPI'
import { AppContext } from '../../context/AppContext'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import ErrorMessage from '../ui/ErrorMessage'
import Loader from '../ui/Loader'
import BlogCard from './BlogCard'

const DraftStories = () => {
	const { serverErrorHandler } = useContext(AppContext)
	const tempRef = useRef<HTMLDivElement>(null)
	const loadMore = useIntersectionObserver(tempRef)

	useEffect(() => {
		if (loadMore && !isFetching && !isFetchingNextPage && hasNextPage) {
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
		['draft-stories'],
		({ pageParam = '' }) => getDraftBlog(pageParam),
		{
			onError: (error: any) => {
				console.log(error)
				serverErrorHandler(error)
			},
			getNextPageParam: (lastPage, pages) =>
				lastPage.data.length ===
					parseInt(import.meta.env.VITE_NUMBER_OF_DOCUMENT_PER_REQUEST) &&
				lastPage.data[lastPage.data.length - 1].updatedAt,
			staleTime: 0
		}
	)
	console.log(data)
	return (
		<Box>
			{isLoading ? (
				<Loader />
			) : isError ? (
				<ErrorMessage message="Failed to fetch Blogs." />
			) : (
				data.pages.map((group, i) => (
					<Fragment key={i}>
						{group.data.map((blog) => (
							<BlogCard key={blog._id} blog={blog} />
						))}
					</Fragment>
				))
			)}
			<div>
				{isFetchingNextPage ? (
					<Loader />
				) : (
					hasNextPage && <div ref={tempRef}></div>
				)}
			</div>
		</Box>
	)
}
export default DraftStories
