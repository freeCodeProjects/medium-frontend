import create from 'zustand'

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
	changeTheme: (newTheme: 'light' | 'dark') => void
}

export const useThemeStore = create<State>((set) => ({
	theme: getInitialTheme(),
	changeTheme: (newTheme) => {
		set({ theme: newTheme })
		localStorage.theme = newTheme
	}
}))
