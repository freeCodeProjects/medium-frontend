import { useInfiniteQuery } from '@tanstack/react-query'
import { Fragment, useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { getComments } from '../../api/commentAPI'
import { Box, Button, Divider } from '@mui/material'
import Loader from '../ui/Loader'
import ErrorMessage from '../ui/ErrorMessage'
import CommentView from './CommentView'

type IProps = {
	postId: string
	sortBy: 'top' | 'latest'
}

const CommentList = ({ postId, sortBy }: IProps) => {
	const { serverErrorHandler } = useContext(AppContext)

	const {
		isLoading,
		isError,
		data,
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
					}}>
					{data.pages.map((group, i) => (
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: '1rem',
								width: '100%',
								py: '0.5rem'
							}}
							key={i}>
							{group.data.map((comment) => (
								<Fragment>
									<CommentView comment={comment} />
									<Divider />
								</Fragment>
							))}
						</Box>
					))}
				</Box>
			)}
			<Fragment>
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
			</Fragment>
		</Box>
	)
}
export default CommentList
