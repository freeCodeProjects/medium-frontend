import axiosInstance from '../utils/axios'
import { AddCommentInput } from '../types/commentTypes'

export const addComment = (
	data: AddCommentInput
): Promise<{ data: string }> => {
	return axiosInstance.post('comment', data)
}
