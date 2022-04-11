import { createTheme, ThemeProvider } from '@mui/material/styles'
import Auth from './components/auth/Auth'
import Home from './pages/Home'
import { useThemeStore } from './store/themeStore'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

function App() {
	const theme = useThemeStore((state) => state.theme)

	const MUItheme = createTheme({
		palette: {
			mode: theme
		}
	})

	return (
		<ThemeProvider theme={MUItheme}>
			<QueryClientProvider client={queryClient}>
				<Auth />
				<Home />
				<ReactQueryDevtools initialIsOpen />
			</QueryClientProvider>
		</ThemeProvider>
	)
}

export default App
