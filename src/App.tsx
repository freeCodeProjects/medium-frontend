import {
	createTheme,
	ThemeProvider,
	responsiveFontSizes
} from '@mui/material/styles'
import { useThemeStore } from './store/themeStore'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AppContextProvider from './context/AppContext'
import AppRouter from './routes/AppRouter'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			cacheTime: Infinity,
			retry: 1,
			networkMode: 'always'
		},
		mutations: {
			networkMode: 'always'
		}
	}
})

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
			<AppContextProvider>
				<QueryClientProvider client={queryClient}>
					<AppRouter />
					<ReactQueryDevtools initialIsOpen />
				</QueryClientProvider>
			</AppContextProvider>
		</ThemeProvider>
	)
}

export default App
