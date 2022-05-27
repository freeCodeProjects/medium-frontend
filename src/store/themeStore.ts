import create from 'zustand'
import { persist } from 'zustand/middleware'
import { mountStoreDevtool } from 'simple-zustand-devtools'

const prefersDarkMode = window.matchMedia(
	'(prefers-color-scheme: dark)'
).matches

type State = {
	theme: 'light' | 'dark'
	changeTheme: () => void
}

export const useThemeStore = create<State>(
	persist(
		(set, get) => ({
			theme: prefersDarkMode ? 'dark' : 'light',
			changeTheme: () => {
				const newTheme = get().theme === 'dark' ? 'light' : 'dark'
				set({ theme: newTheme })
			}
		}),
		{
			name: 'theme-storage'
		}
	)
)

//@ts-ignore
if (process.env.NODE_ENV === 'development') {
	//@ts-ignore
	mountStoreDevtool('ThemeStore', useThemeStore)
}
