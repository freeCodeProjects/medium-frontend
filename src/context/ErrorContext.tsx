import { createContext, ReactNode } from 'react'
import { useAppStore } from '../store/appStore'

interface AppContextInterface {
	serverErrorHandler: (error: any) => void
}

export const ErrorContext = createContext<AppContextInterface>({
	serverErrorHandler: () => {}
})

const ErrorContextProvider = ({ children }: { children: ReactNode }) => {
	const { setAlertData } = useAppStore()

	const serverErrorHandler = (error: any) => {
		if (error.response) {
			const {
				response: { status, data }
			} = error
			console.log('Server error', status, data.message)
			if (status === 401 || status === 403) {
				setAlertData('Please Authenticate', 'error')
			} else if (status === 400) {
				setAlertData('Required data not provided.', 'error')
			} else if (status === 500) {
				setAlertData('Backend server error', 'error')
			} else {
				setAlertData(data.message, 'error')
			}
		} else {
			setAlertData(error.message, 'error')
		}
		return 'Error Occured'
	}
	return (
		<ErrorContext.Provider value={{ serverErrorHandler }}>
			{children}
		</ErrorContext.Provider>
	)
}
export default ErrorContextProvider
