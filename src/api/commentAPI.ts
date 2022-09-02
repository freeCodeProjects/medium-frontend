import axiosInstance from '../utils/axios'
import { AddCommentInput, Comment } from '../types/commentTypes'

export const addComment = (
	data: AddCommentInput
): Promise<{ data: string }> => {
	return axiosInstance.post('comment', data)
}

export const getComments = (
	postId: string,
	beforeTime: string,
	sortBy: 'top' | 'latest'
): Promise<{ data: Comment[] }> => {
	return axiosInstance.get('comments', {
		params: { postId, beforeTime, sortBy }
	})
}
