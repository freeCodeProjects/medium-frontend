import { createContext, ReactNode } from 'react'
import { onlineManager } from 'react-query'
import { useAppStore } from '../store/appStore'

interface AppContextInterface {
	serverErrorHandler: (error: any) => void
	checkIsOnlineWrapper: (fn: Function) => Promise<any>
}

export const AppContext = createContext<AppContextInterface>({
	serverErrorHandler: () => {},
	checkIsOnlineWrapper: () => new Promise(() => {})
})

const AppContextProvider = ({ children }: { children: ReactNode }) => {
	const { setAlertData, deleteUser } = useAppStore()

	const checkIsOnlineWrapper = (fn: Function) => {
		if (onlineManager.isOnline()) {
			return Promise.resolve(fn())
		}
		setAlertData('You are offline!', 'error')
		return Promise.reject({ message: 'Action Failed. You are offline!' })
	}

	const serverErrorHandler = (error: any) => {
		if (error.response) {
			const {
				response: { status, data }
			} = error
			console.log('Server error', status, data)
			if (status === 401 || status === 403) {
				setAlertData(data.message, 'error')
				deleteUser()
			} else if (status === 400) {
				let message = ''
				if (Array.isArray(data)) {
					data.forEach((error) => {
						message += error.message + '. '
					})
				} else {
					message = data.message
				}
				setAlertData(message, 'error')
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
		<AppContext.Provider value={{ serverErrorHandler, checkIsOnlineWrapper }}>
			{children}
		</AppContext.Provider>
	)
}
export default AppContextProvider
