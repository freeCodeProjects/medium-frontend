import create from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { AlertColor } from '@mui/material'
import { User } from '../types/userTypes'

type State = {
	isLoggedIn: boolean
	userId: string
	user: User | {}
	setUser: (user: User) => void
	deleteUser: () => void
	openAuthModal: boolean
	handleOpenAuthModal: () => void
	handleCloseAuthModal: () => void
	openAlert: boolean
	alertType: AlertColor
	alertMessage: string
	setAlertData: (message: string, type?: AlertColor) => void
	handleOpenAlert: () => void
	handleCloseAlert: () => void
}

export const useAppStore = create<State>((set) => ({
	isLoggedIn: false,
	userId: localStorage.getItem('userId') || '',
	user: {},
	setUser: (user) => {
		console.log(user)
		set({ userId: user._id, user, isLoggedIn: true })
		localStorage.setItem('userId', user._id)
	},
	deleteUser: () => {
		set({ userId: '', user: {}, isLoggedIn: false })
		localStorage.removeItem('userId')
	},
	openAlert: false,
	alertType: 'success',
	alertMessage: '',
	setAlertData: (message, type = 'success') => {
		set({ openAlert: true, alertType: type, alertMessage: message })
	},
	handleOpenAlert: () => {
		set({ openAlert: true })
	},
	handleCloseAlert: () => set({ openAlert: false }),
	openAuthModal: false,
	handleOpenAuthModal: () => {
		set({ openAuthModal: true })
	},
	handleCloseAuthModal: () => set({ openAuthModal: false })
}))

//@ts-ignore
if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('AppStore', useAppStore)
}
