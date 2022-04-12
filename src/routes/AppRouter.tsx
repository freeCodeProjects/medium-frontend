import { Box, Container } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from '../components/auth/Auth'
import CustomAlert from '../components/ui/CustomAlert'
import Footer from '../components/ui/Footer'
import Navbar from '../components/ui/Navbar'
import Home from '../pages/Home'
import VerifyUser from '../pages/VerifyUser'

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
					<Box sx={{ padding: '0 24px', height: '100%' }}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/verifyUser" element={<VerifyUser />} />
						</Routes>
					</Box>
				</Container>
				<Footer />
			</Box>
		</BrowserRouter>
	)
}
export default AppRouter
