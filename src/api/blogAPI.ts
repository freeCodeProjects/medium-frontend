import { BlogEditorData } from '../types/blogTypes'
import axiosInstance from '../utils/axios'

export const addBlog = (data: BlogEditorData) => {
	return axiosInstance.post('/blog', data)
}

export const getBlog = (id: string) => {
	return axiosInstance.get(`/blog/${id}`)
}

export const updateBlog = (id: string, data: BlogEditorData) => {
	return axiosInstance.patch(`/blog/${id}`, data)
}
