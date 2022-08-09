import { Button, Box } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getFollower, addFollower, deleteFollower } from '../../api/followerAPI'
import { useAppStore } from '../../store/appStore'
import { UserPreview } from '../../types/userTypes'

type IProps = {
	userId: string
}

const FollowButton = ({ userId }: IProps) => {
	const { isLoggedIn, handleOpenAuthModal, user } = useAppStore()

	const queryClient = useQueryClient()

	const { data } = useQuery(['following', userId], () => {
		if (!isLoggedIn) {
			return
		}
		return getFollower(userId)
	})

	const { mutate: follow } = useMutation(
		() => {
			return addFollower(userId)
		},
		{
			onMutate: async (newData) => {
				await queryClient.cancelQueries(['following', userId])

				const previousFollowerData = queryClient.getQueryData([
					'following',
					userId
				])

				queryClient.setQueryData(['following', userId], () => ({
					data: {
						isFollowing: true
					}
				}))

				return { previousFollowerData }
			},
			onError: (err, newData, context) => {
				queryClient.setQueryData(
					['following', userId],
					context?.previousFollowerData
				)
			},
			onSettled: () => {
				queryClient.invalidateQueries(['following', userId])
			},
			onSuccess: () => {
				// increase the followerCount locally
				queryClient.setQueryData(
					['userById', userId],
					(old: { data: UserPreview } | undefined) => {
						if (!old) {
							return old
						}
						const { data } = old
						return {
							...old,
							data: { ...old.data, followerCount: data.followerCount + 1 }
						}
					}
				)
			}
		}
	)

	const { mutate: unfollow } = useMutation(
		() => {
			return deleteFollower(userId)
		},
		{
			// When mutate is called:
			onMutate: async (newData) => {
				// Cancel any outgoing refetches (so they don't overwrite our optimistic update)
				await queryClient.cancelQueries(['following', userId])

				// Snapshot the previous value
				const previousFollowerData = queryClient.getQueryData([
					'following',
					userId
				])

				// Optimistically update to the newData value
				queryClient.setQueryData(['following', userId], () => ({
					data: {
						isFollowing: false
					}
				}))

				// Return a context object with the snapshotted value
				return { previousFollowerData }
			},
			// If the mutation fails, use the context returned from onMutate to roll back
			onError: (err, newData, context) => {
				queryClient.setQueryData(
					['following', userId],
					context?.previousFollowerData
				)
			},
			onSettled: () => {
				queryClient.invalidateQueries(['following', userId])
			},
			onSuccess: () => {
				// decrease the followerCount locally
				queryClient.setQueryData(
					['userById', userId],
					(old: { data: UserPreview } | undefined) => {
						if (!old) {
							return old
						}
						const { data } = old
						return {
							...old,
							data: { ...old.data, followerCount: data.followerCount - 1 }
						}
					}
				)
			}
		}
	)

	const completeAction = (fn: Function) => {
		if (!isLoggedIn) {
			handleOpenAuthModal()
			return
		}
		fn()
	}

	const isFollowing = data?.data.isFollowing
	return isLoggedIn && user?._id === userId ? (
		<></>
	) : (
		<Box>
			{!isFollowing ? (
				<Button
					size="small"
					className="roundedBtn"
					variant="contained"
					color="success"
					onClick={() => completeAction(follow)}>
					Follow
				</Button>
			) : (
				<Button
					size="small"
					className="roundedBtn"
					color="success"
					onClick={() => completeAction(unfollow)}>
					Following
				</Button>
			)}
		</Box>
	)
}
export default FollowButton
