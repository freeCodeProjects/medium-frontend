import { Navigate } from 'react-router-dom'
import { useAppStore } from '../store/appStore'

const NotProtectedRoute = ({
	Component
}: {
	Component: React.FunctionComponent
}) => {
	const { isLoggedIn } = useAppStore()

	return isLoggedIn ? <Navigate to="/" replace /> : <Component />
}
export default NotProtectedRoute
