import { createTheme, ThemeProvider } from '@mui/material/styles'
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
			<Home />
		</ThemeProvider>
	)
}

export default App
