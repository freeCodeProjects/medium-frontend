import { Box, Container } from '@mui/material'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from '../components/auth/Auth'
import CustomAlert from '../components/ui/CustomAlert'
import Footer from '../components/ui/Footer'
import Navbar from '../components/ui/Navbar'
import Home from '../pages/Home'
import Setting from '../pages/Setting'
import VerifyUser from '../pages/VerifyUser'
import ProtectedRoute from './ProtectedRoute'
import NotProtectedRoute from './NotProtectedRoute'

const AppRouter = () => {
	return (
		<BrowserRouter>
			<CustomAlert />
			<Auth />
			<Navbar />
			<Box
				sx={{
					overflow: 'scroll',
					bgcolor: 'background.default',
					display: 'flex',
					flexDirection: 'column',
					color: 'text.primary',
					height: { xs: 'calc(100% - 56px)', sm: 'calc(100% - 64px)' },
					pt: { xs: '56px', sm: '64px' }
				}}>
				<Container maxWidth="xl" sx={{ flexGrow: 1 }}>
					<Box
						sx={{
							padding: { xs: '0 0', sm: '0 12px', md: '0 24px' },
							height: '100%'
						}}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route
								path="/settings"
								element={<ProtectedRoute Component={Setting} />}
							/>
							<Route
								path="/verifyUser"
								element={<NotProtectedRoute Component={VerifyUser} />}
							/>
							<Route path="*" element={<Navigate to="/" replace />} />
						</Routes>
					</Box>
				</Container>
				<Footer />
			</Box>
		</BrowserRouter>
	)
}
export default AppRouter
