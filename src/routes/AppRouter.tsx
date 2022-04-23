import React, { Suspense } from 'react'
import { Box, Container } from '@mui/material'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SuspenseLoader from '../components/ui/SuspenseLoader'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'
import ProtectedRoute from './ProtectedRoute'
import NotProtectedRoute from './NotProtectedRoute'
import CustomAlert from '../components/ui/CustomAlert'
import Auth from '../components/auth/Auth'
import { useAppStore } from '../store/appStore'
import ResetPassword from '../pages/ResetPassword'
const Home = React.lazy(() => import('../pages/Home'))
const Setting = React.lazy(() => import('../pages/Setting'))
const VerifyUser = React.lazy(() => import('../pages/VerifyUser'))

const AppRouter = () => {
	return (
		<Suspense fallback={<SuspenseLoader />}>
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
								<Route
									path="/resetpassword"
									element={<NotProtectedRoute Component={ResetPassword} />}
								/>
								<Route path="*" element={<Navigate to="/" replace />} />
							</Routes>
						</Box>
					</Container>
					<Footer />
				</Box>
			</BrowserRouter>
		</Suspense>
	)
}
export default AppRouter
