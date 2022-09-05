import axiosInstance from '../utils/axios'
import { Clap } from '../types/clapTypes'

export const addClaps = (
	claps: number,
	relatedTo: 'blog' | 'comment',
	postId: string
): Promise<any> => {
	//handle the base case when trying to add 0 claps
	if (claps === 0) {
		return Promise.resolve('No clap to add')
	}
	return axiosInstance.post('/clap', { claps, relatedTo, postId })
}

export const getClaps = (postId: string): Promise<{ data: Clap }> => {
	return axiosInstance.get(`/clap/${postId}`)
}
