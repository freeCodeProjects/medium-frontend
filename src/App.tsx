import {
	createTheme,
	ThemeProvider,
	responsiveFontSizes
} from '@mui/material/styles'
import { useThemeStore } from './store/themeStore'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import ErrorContextProvider from './context/ErrorContext'
import AppRouter from './routes/AppRouter'

const queryClient = new QueryClient()

function App() {
	const theme = useThemeStore((state) => state.theme)

	let MUITheme = createTheme({
		palette: {
			mode: theme
		},
		components: {
			// Name of the component
			MuiMenuItem: {
				styleOverrides: {
					root: {
						// fix minHeight issue on 'xs' breakpoint
						minHeight: 'auto'
					}
				}
			}
		}
	})

	MUITheme = responsiveFontSizes(MUITheme)

	return (
		<ThemeProvider theme={MUITheme}>
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
