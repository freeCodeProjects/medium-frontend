import axiosInstance from '../utils/axios'
import { AddCommentInput, Comment } from '../types/commentTypes'

export const addComment = (
	data: AddCommentInput
): Promise<{ data: string }> => {
	return axiosInstance.post('comment', data)
}

export const updateComment = (
	id: string,
	comment: string
): Promise<{ data: string }> => {
	return axiosInstance.patch(`/comment/${id}`, { comment })
}

export const deleteComment = (id: string): Promise<{ data: string }> => {
	return axiosInstance.delete(`/comment/${id}`)
}

export const getComments = (
	postId: string,
	sortBy: 'top' | 'recent',
	pageParams: {
		beforeTime: string
		lastClapsCount: string
	}
): Promise<{ data: Comment[] }> => {
	return axiosInstance.get('comments', {
		params: {
			postId,
			sortBy,
			beforeTime: pageParams.beforeTime,
			lastClapsCount: pageParams.lastClapsCount
		}
	})
}
