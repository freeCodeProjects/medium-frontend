import create from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'

type State = {
	openAuthModal: boolean
	handleOpenAuthModal: () => void
	handleCloseAuthModal: () => void
}

export const useAuthStore = create<State>((set) => ({
	openAuthModal: false,
	handleOpenAuthModal: () => {
		set({ openAuthModal: true })
	},
	handleCloseAuthModal: () => set({ openAuthModal: false })
}))

//@ts-ignore
if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('Store', useAuthStore)
}
