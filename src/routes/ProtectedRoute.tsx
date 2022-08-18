import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Navigate } from 'react-router-dom'
import { useAppStore } from '../store/appStore'

const ProtectedRoute = ({ component }: { component: ReactJSXElement }) => {
	const { isLoggedIn } = useAppStore()

	return isLoggedIn ? component : <Navigate to="/" replace />
}
export default ProtectedRoute
