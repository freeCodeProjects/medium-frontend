import create from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'

const prefersDarkMode = window.matchMedia(
	'(prefers-color-scheme: dark)'
).matches

const getInitialTheme = (): 'light' | 'dark' => {
	let tempTheme: 'light' | 'dark' = 'light'
	if (
		localStorage.theme === 'dark' ||
		(!localStorage.theme && prefersDarkMode)
	) {
		localStorage.theme = 'dark'
		tempTheme = 'dark'
	} else {
		localStorage.theme = 'light'
		tempTheme = 'light'
	}
	return tempTheme
}

type State = {
	theme: 'light' | 'dark'
	changeTheme: () => void
}

export const useThemeStore = create<State>((set, get) => ({
	theme: getInitialTheme(),
	changeTheme: () => {
		const newTheme = get().theme === 'dark' ? 'light' : 'dark'
		set({ theme: newTheme })
		localStorage.theme = newTheme
	}
}))

//@ts-ignore
if (process.env.NODE_ENV === 'development') {
	//@ts-ignore
	mountStoreDevtool('ThemeStore', useThemeStore)
}
