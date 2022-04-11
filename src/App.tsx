import { createTheme, ThemeProvider } from '@mui/material/styles'
import Auth from './components/auth/Auth'
import Home from './pages/Home'
import { useThemeStore } from './store/themeStore'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import CustomAlert from './components/ui/CustomAlert'
import ErrorContextProvider from './context/ErrorContext'

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
			<ErrorContextProvider>
				<QueryClientProvider client={queryClient}>
					<CustomAlert />
					<Auth />
					<Home />
					<ReactQueryDevtools initialIsOpen />
				</QueryClientProvider>
			</ErrorContextProvider>
		</ThemeProvider>
	)
}

export default App
