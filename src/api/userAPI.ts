import { UserSignupData, UserLoginData } from '../types/userTypes'
import axiosInstance from '../utils/axios'

export const signupUser = (data: UserSignupData) => {
	return axiosInstance.post('/signup', data)
}

export const verifyUser = (token: string) => {
	return axiosInstance.get(`/verifyUser?token=${token}`)
}

export const loginUser = (data: UserLoginData) => {
	return axiosInstance.post('/login', data)
}
