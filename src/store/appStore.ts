import create from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { AlertColor } from '@mui/material'
import { User } from '../types/userTypes'

type State = {
	isLoggedIn: boolean
	user: User | null
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
	isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn') || 'false'),
	user: null,
	setUser: (user) => {
		set({ user, isLoggedIn: true })
		localStorage.setItem('isLoggedIn', JSON.stringify(true))
	},
	deleteUser: () => {
		set({ user: null, isLoggedIn: false })
		localStorage.removeItem('isLoggedIn')
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
	//@ts-ignore
	mountStoreDevtool('AppStore', useAppStore)
}
