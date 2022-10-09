import {
	Blog,
	BlogEditorData,
	BlogPreview,
	PublishBlogData
} from '../types/blogTypes'
import axiosInstance from '../utils/axios'
import { BlogAutoComplete } from '../types/blogTypes'

export const addBlog = (data: BlogEditorData) => {
	return axiosInstance.post('/blog', data)
}

export const getBlog = (id: string) => {
	return axiosInstance.get(`/blog/getById/${id}`)
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
	return axiosInstance.get(`/blog/editor/iframeHeight`, {
		params: {
			url,
			source,
			width
		}
	})
}

export const publishBlog = (id: string, data: PublishBlogData) => {
	return axiosInstance.post(`/blog/publish/${id}`, { ...data })
}

export const getTrendingBlog = (): Promise<{ data: BlogPreview[] }> => {
	return axiosInstance.get(`/blog/trending`)
}

export const getLatestBlog = (
	beforeTime: string
): Promise<{ data: BlogPreview[] }> => {
	return axiosInstance.get(`/blog/latest`, { params: { beforeTime } })
}

export const getBlogBySlug = (slug: string): Promise<{ data: BlogPreview }> => {
	return axiosInstance.get(`/blog/slug/${slug}`)
}

export const getUserBlogs = (
	beforeTime: string,
	isPublished: boolean
): Promise<{ data: Blog[] }> => {
	return axiosInstance.get(`/user/blogs`, {
		params: { beforeTime, isPublished }
	})
}

export const getUserList = (
	beforeId: string,
	type: 'bookmarks' | 'previouslyRead'
): Promise<{ data: BlogPreview[] }> => {
	return axiosInstance.get(`/user/list`, {
		params: { beforeId, type }
	})
}

export const getUserPublicBlogs = (
	beforeTime: string,
	userId: string
): Promise<{ data: BlogPreview[] }> => {
	return axiosInstance.get(`/user/publicBlogs`, {
		params: { beforeTime, userId }
	})
}

export const deleteBlog = (id: string) => {
	return axiosInstance.delete(`/blog/${id}`)
}

export const autocompleteBlog = (
	text: string
): Promise<{ data: BlogAutoComplete[] }> => {
	return axiosInstance.get(`/blog/autocomplete?q=${text}`)
}

export const searchBlog = (text: string): Promise<{ data: BlogPreview[] }> => {
	return axiosInstance.get(`/blog/search?q=${text}`)
}
