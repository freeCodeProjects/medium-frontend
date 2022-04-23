import LoginForm from './LoginForm'
import { useState } from 'react'
import PasswordResetForm from './PasswordResetForm'

const Login = () => {
	const [passwordResetPage, setPasswordResetPage] = useState(false)

	return (
		<>
			{passwordResetPage ? (
				<PasswordResetForm setPasswordResetPage={setPasswordResetPage} />
			) : (
				<LoginForm setPasswordResetPage={setPasswordResetPage} />
			)}
		</>
	)
}
export default Login
