import { UserSignupData, UserLoginData } from '../types/userTypes'
import axiosInstance from '../utils/axios'

export const signupUser = (data: UserSignupData) => {
	return axiosInstance.post('/user/signup', data)
}

export const verifyUser = (token: string) => {
	return axiosInstance.get(`/user/verifyUser?token=${token}`)
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
