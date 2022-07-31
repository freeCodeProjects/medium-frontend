import axiosInstance from '../utils/axios'

export const getFollower = (
	userId: string
): Promise<{ data: { isFollowing: boolean } }> => {
	return axiosInstance.get(`/follower/${userId}`)
}

export const addFollower = (
	userId: string
): Promise<{ data: { isFollowing: boolean } }> => {
	return axiosInstance.post(`/follower/${userId}`)
}

export const deleteFollower = (
	userId: string
): Promise<{ data: { isFollowing: boolean } }> => {
	return axiosInstance.delete(`/follower/${userId}`)
}
