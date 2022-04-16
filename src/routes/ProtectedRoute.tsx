import { Navigate } from 'react-router-dom'
import { useAppStore } from '../store/appStore'

const ProtectedRoute = ({
	Component
}: {
	Component: React.FunctionComponent
}) => {
	const { isLoggedIn } = useAppStore()

	return isLoggedIn ? <Component /> : <Navigate to="/" replace />
}
export default ProtectedRoute
