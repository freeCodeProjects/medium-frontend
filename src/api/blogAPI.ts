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

export const uploadEditorImageFile = (file: File) => {
	const formData = new FormData()
	formData.append('image', file)
	return axiosInstance.post('/blog/editor/imageFile', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

export const updateEditorImageUrl = (url: string) => {
	return axiosInstance.post(`/blog/editor/imageUrl`, { url })
}

export const getIframeHeight = (url: string, source: string, width: number) => {
	return axiosInstance.get(
		`/blog/editor/iframeHeight?url=${url}&source=${source}&width=${width}`
	)
}
