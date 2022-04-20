import {
	UserSignupData,
	UserLoginData,
	Name,
	Bio,
	UserName
} from '../types/userTypes'
import axiosInstance from '../utils/axios'

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
	console.log(file)
	const formData = new FormData()
	formData.append('profile', file)
	return axiosInstance.patch('/user/photo', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

export const updateUserName = (data: UserName) => {
	return axiosInstance.patch('/user/userName', data)
}

export const deleteUser = () => {
	return axiosInstance.delete('/user')
}
