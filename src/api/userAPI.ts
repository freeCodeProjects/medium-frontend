import {
	UserSignupData,
	UserLoginData,
	Name,
	Bio,
	UserName,
	User
} from '../types/userTypes'
import axiosInstance from '../utils/axios'
import {
	ResetPasswordMailData,
	ResetPasswordData,
	UserPreview
} from '../types/userTypes'

export const signupUser = (data: UserSignupData) => {
	return axiosInstance.post('/user/signup', data)
}

export const verifyUser = (token: string) => {
	return axiosInstance.get(`/user/verify?token=${token}`)
}

export const loginUser = (data: UserLoginData) => {
	return axiosInstance.post('/user/login', data)
}

export const getLoggedInUser = () => {
	return axiosInstance.get('/user/loggedIn')
}

export const logoutUser = () => {
	return axiosInstance.get('/user/logout')
}

export const updateName = (data: Name) => {
	return axiosInstance.patch('/user/name', data)
}

export const updateBio = (data: Bio) => {
	return axiosInstance.patch('/user/bio', data)
}

export const updatePhoto = (file: File) => {
	const formData = new FormData()
	formData.append('profile', file)
	return axiosInstance.patch('/user/photo', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

export const isUserNameUnique = (userName: string) => {
	return axiosInstance.get(`/user/isNameUnique?userName=${userName}`)
}

export const updateUserName = (data: UserName) => {
	return axiosInstance.patch('/user/userName', data)
}

export const deleteUser = () => {
	return axiosInstance.delete('/user')
}

export const sendResetPasswordMail = (data: ResetPasswordMailData) => {
	return axiosInstance.post('/user/passwordResetMail', data)
}

export const resetPassword = (data: ResetPasswordData & { token: string }) => {
	return axiosInstance.patch('/user/password', data)
}

export const addToBookmark = (blogId: string): Promise<{ data: User }> => {
	return axiosInstance.patch(`/user/bookmarkBlog/${blogId}`)
}

export const removeFromBookmark = (blogId: string): Promise<{ data: User }> => {
	return axiosInstance.delete(`/user/bookmarkBlog/${blogId}`)
}

export const getUserById = (id: string): Promise<{ data: UserPreview }> => {
	return axiosInstance.get(`/user/id/${id}`)
}

export const addBlogToPreviouslyRead = (
	blogId: string
): Promise<{ data: UserPreview }> => {
	return axiosInstance.patch(`/user/previouslyReadBlog/${blogId}`)
}
