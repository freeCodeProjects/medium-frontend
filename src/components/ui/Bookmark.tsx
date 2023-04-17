import { IconButton, SvgIcon, Tooltip } from '@mui/material'
import { useAppStore } from '../../store/appStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addToBookmark, removeFromBookmark } from '../../api/userAPI'
import { MouseEvent, useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { User } from '../../types/userTypes'

const BookmarkIcon = () => (
	<SvgIcon>
		<path d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5v-2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V5.75z"></path>
	</SvgIcon>
)

const BookmarkedIcon = () => (
	<SvgIcon>
		<path d="M7.5 3.75a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-14a2 2 0 0 0-2-2h-9z"></path>
	</SvgIcon>
)

type IProps = {
	blogId: string
}

interface PreviousUserDataType {
	previousUserData: User
}

const Bookmark = ({ blogId }: IProps) => {
	const { user, setUser } = useAppStore()
	const { serverErrorHandler } = useContext(AppContext)
	const queryClient = useQueryClient()

	const { mutate: addBookmark } = useMutation(addToBookmark, {
		onMutate: async (newTodo) => {
			const previousUserData = user!

			setUser({ ...user!, bookmarks: [...user?.bookmarks!, blogId] })

			return { previousUserData }
		},
		onError: (err, newTodo, context) => {
			serverErrorHandler(err)
			if (context) {
				setUser((context as PreviousUserDataType).previousUserData)
			} else {
				console.log('Failed to reset USER on addBookmark(onError)')
			}
		},
		onSuccess: () => {
			//refetch when remove bookmark on bookmarks page
			queryClient.invalidateQueries(['bookmarks-list'])
			queryClient.invalidateQueries(['user'])
		}
	})

	const { mutate: removeBookmark } = useMutation(removeFromBookmark, {
		onMutate: async (newTodo) => {
			const previousUserData = user!

			const newBookmarks = user?.bookmarks.filter(
				(bookmark) => bookmark !== blogId
			)
			setUser({ ...user!, bookmarks: newBookmarks! })

			return { previousUserData }
		},
		onError: (err, newTodo, context) => {
			serverErrorHandler(err)
			if (context) {
				setUser((context as PreviousUserDataType).previousUserData)
			} else {
				console.log('Failed to reset USER on removeBookmark(onError)')
			}
		},
		onSuccess: () => {
			//refetch when remove bookmark on bookmarks page
			queryClient.invalidateQueries(['bookmarks-list'])
			queryClient.invalidateQueries(['user'])
		}
	})

	const isBookMarked = () => {
		if (user) {
			for (let id of user.bookmarks) {
				if (id === blogId) {
					return true
				}
			}
		}
		return false
	}

	const performAction = (event: MouseEvent, fn: Function) => {
		event.stopPropagation()
		fn(blogId)
	}

	return (
		<div>
			{!isBookMarked() ? (
				<Tooltip title="Add to bookmark">
					<IconButton
						aria-label="add to bookmark"
						onClick={(e) => performAction(e, addBookmark)}
					>
						<BookmarkIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Remove bookmark">
					<IconButton
						aria-label="remove bookmark"
						onClick={(e) => performAction(e, removeBookmark)}
					>
						<BookmarkedIcon />
					</IconButton>
				</Tooltip>
			)}
		</div>
	)
}
export default Bookmark
