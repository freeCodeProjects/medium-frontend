import { Navigate } from 'react-router-dom'
import { useAppStore } from '../store/appStore'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

const NotProtectedRoute = ({ component }: { component: ReactJSXElement }) => {
	const { isLoggedIn } = useAppStore()

	return isLoggedIn ? <Navigate to="/" replace /> : component
}
export default NotProtectedRoute
