import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Navigate } from 'react-router-dom'
import { useAppStore } from '../store/appStore'

const ProtectedRoute = ({ Component }: { Component: ReactJSXElement }) => {
	const { isLoggedIn } = useAppStore()

	return isLoggedIn ? Component : <Navigate to="/" replace />
}
export default ProtectedRoute
