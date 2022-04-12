import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useThemeStore } from './store/themeStore'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import ErrorContextProvider from './context/ErrorContext'
import AppRouter from './routes/AppRouter'

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
					<AppRouter />
					<ReactQueryDevtools initialIsOpen />
				</QueryClientProvider>
			</ErrorContextProvider>
		</ThemeProvider>
	)
}

export default App
