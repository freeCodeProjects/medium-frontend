import { Notification } from '../types/notificationTypes'
import axiosInstance from '../utils/axios'

export const resetNotificationCount = (): Promise<{ data: string }> => {
	return axiosInstance.get('/notification/reset')
}

export const getNotificationCount = (): Promise<{
	data: { newNotificationCount: number }
}> => {
	return axiosInstance.get('/notification/count')
}

export const getNotifications = (
	beforeTime: string
): Promise<{ data: Notification[] }> => {
	return axiosInstance.get(`/notifications`, { params: { beforeTime } })
}
