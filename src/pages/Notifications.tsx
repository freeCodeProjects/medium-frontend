import { Box, Container, Divider, Stack } from '@mui/material'
import BoldTypography from '../components/ui/BoldTypography'
import {
	resetNotificationCount,
	getNotifications
} from '../api/notificationAPI'
import Loader from '../components/ui/Loader'
import ErrorMessage from '../components/ui/ErrorMessage'
import { useContext, useEffect, useRef } from 'react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import {
	useInfiniteQuery,
	useQuery,
	useQueryClient
} from '@tanstack/react-query'
import { AppContext } from '../context/AppContext'
import NotificationCard from '../components/notifications/NotificationCard'

const Notifications = () => {
	const queryClient = useQueryClient()
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
		[`notifications`],
		({ pageParam = '' }) => getNotifications(pageParam),
		{
			onError: (error: any) => {
				console.log(error)
				serverErrorHandler(error)
			},
			getNextPageParam: (lastPage, pages) =>
				lastPage.data.length ===
				parseInt(import.meta.env.VITE_NUMBER_OF_DOCUMENT_PER_REQUEST)
					? lastPage.data[lastPage.data.length - 1].createdAt
					: undefined,
			refetchOnMount: 'always'
		}
	)

	useQuery(['resetNotificationCount'], resetNotificationCount, {
		refetchOnMount: 'always',
		onSuccess: () => {
			queryClient.refetchQueries(['notificationCount'])
		}
	})

	return (
		<Container maxWidth="md">
			<Stack rowGap={2} sx={{ mt: '2rem', mb: '1rem' }}>
				<BoldTypography variant="h5">Notifications</BoldTypography>
				<Divider />
				<Box sx={{ px: { md: '1rem' } }}>
					{isLoading ? (
						<Loader />
					) : isError ? (
						<ErrorMessage message="Failed to fetch notifications." />
					) : data.pages[0].data.length > 0 ? (
						data.pages.map((group, i) =>
							group.data.map((notification) => (
								<Stack spacing={2} sx={{ pt: '1rem' }}>
									<NotificationCard notification={notification} />
									<Divider />
								</Stack>
							))
						)
					) : (
						'No notification found.'
					)}
					{isFetchingNextPage && <Loader />}
					{!isFetching && hasNextPage && <div ref={tempRef}></div>}
				</Box>
			</Stack>
		</Container>
	)
}
export default Notifications
