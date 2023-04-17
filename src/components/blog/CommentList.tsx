import { useInfiniteQuery } from '@tanstack/react-query'
import { Fragment, useContext, useEffect, useRef } from 'react'
import { AppContext } from '../../context/AppContext'
import { getComments } from '../../api/commentAPI'
import { Box, Button, Divider } from '@mui/material'
import Loader from '../ui/Loader'
import ErrorMessage from '../ui/ErrorMessage'
import CommentView from './CommentView'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'

type IProps = {
	postId: string
	sortBy: 'top' | 'recent'
	relatedTo: 'blog' | 'comment'
}

const CommentList = ({ postId, sortBy, relatedTo }: IProps) => {
	const { serverErrorHandler } = useContext(AppContext)
	const tempRef = useRef<HTMLDivElement>(null)
	const loadMore = useIntersectionObserver(tempRef, false, {
		root: null,
		rootMargin: '0px 0px 200px 0px',
		threshold: 0.1
	})

	const {
		isLoading,
		isError,
		data,
		isFetching,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	} = useInfiniteQuery(
		['comments', postId, sortBy],
		({ pageParam = { beforeTime: '', lastClapsCount: '' } }) =>
			getComments(postId, sortBy, pageParam),
		{
			onError: (error: any) => {
				console.log(error)
				serverErrorHandler(error)
			},
			getNextPageParam: (lastPage, pages) =>
				lastPage.data.length ===
				parseInt(import.meta.env.VITE_NUMBER_OF_DOCUMENT_PER_REQUEST)
					? {
							beforeTime: lastPage.data[lastPage.data.length - 1].createdAt,
							lastClapsCount: lastPage.data[lastPage.data.length - 1].clapsCount
					  }
					: undefined,
			refetchOnMount: 'always'
		}
	)

	useEffect(() => {
		if (loadMore) {
			fetchNextPage()
		}
	}, [loadMore])

	return (
		<Box sx={{ width: '100%' }}>
			{isLoading ? (
				<Loader />
			) : isError ? (
				<ErrorMessage message="Failed to fetch responses." />
			) : (
				<Box
					sx={{
						width: '100%',
						pt: '1rem'
					}}
				>
					{data.pages.map((group, i) => (
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: '1rem',
								width: '100%',
								py: '0.5rem'
							}}
							key={i}
						>
							{group.data.map((comment, idx) => (
								<Fragment key={comment._id}>
									<CommentView comment={comment} />
									{/* hide divider for last child */}
									{!(
										i === data.pages.length - 1 && idx === group.data.length - 1
									) && <Divider />}
								</Fragment>
							))}
						</Box>
					))}
				</Box>
			)}
			{isFetchingNextPage && <Loader />}
			{!isFetching &&
				hasNextPage &&
				(relatedTo === 'blog' ? (
					<div ref={tempRef}></div>
				) : (
					<Button
						sx={{ width: '100%', mt: '1rem' }}
						onClick={() => fetchNextPage()}
					>
						Load More
					</Button>
				))}
		</Box>
	)
}
export default CommentList
