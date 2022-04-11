import create from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { AlertColor } from '@mui/material'

type State = {
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
	openAlert: true,
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
	mountStoreDevtool('Store', useAppStore)
}
