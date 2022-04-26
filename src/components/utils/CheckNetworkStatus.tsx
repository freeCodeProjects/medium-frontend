import { useEffect } from 'react'
import { onlineManager } from 'react-query'
import { useAppStore } from '../../store/appStore'

const CheckNetworkStatus = () => {
	const { setAlertData } = useAppStore()

	useEffect(() => {
		window.addEventListener('offline', () => {
			setAlertData('You are offline!', 'error')
			onlineManager.setOnline(false)
		})
		window.addEventListener('online', () => {
			setAlertData('Back online.')
			onlineManager.setOnline(true)
		})
	})

	return <></>
}
export default CheckNetworkStatus
