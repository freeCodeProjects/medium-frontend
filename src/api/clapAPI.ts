import axiosInstance from '../utils/axios'
import { Clap } from '../types/clapTypes'

export const addClaps = (
	claps: number,
	relatedTo: 'blog' | 'comment',
	postId: string
): Promise<{ data: Clap }> => {
	return axiosInstance.post('/clap', { claps, relatedTo, postId })
}

export const getClaps = (postId: string): Promise<{ data: Clap }> => {
	return axiosInstance.get(`/clap/${postId}`)
}
