import { createTheme, ThemeProvider } from '@mui/material/styles'
import Auth from './components/auth/Auth'
import Home from './pages/Home'
import { useThemeStore } from './store/themeStore'

function App() {
	const theme = useThemeStore((state) => state.theme)

	const MUItheme = createTheme({
		palette: {
			mode: theme
		}
	})

	return (
		<ThemeProvider theme={MUItheme}>
			<Auth />
			<Home />
		</ThemeProvider>
	)
}

export default App
