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
import ResetPassword from '../pages/ResetPassword'
import CheckNetworkStatus from '../components/utils/CheckNetworkStatus'
import ScrollToTop from '../components/utils/ScrollToTop'
import GetStories from '../components/stories/GetStories'
import GetList from '../components/list/GetList'
import List from '../pages/List'
const Notifications = React.lazy(() => import('../pages/Notifications'))
const Stories = React.lazy(() => import('../pages/Stories'))
const AddorUpdateBlog = React.lazy(() => import('../pages/AddorUpdateBlog'))
const Home = React.lazy(() => import('../pages/Home'))
const Setting = React.lazy(() => import('../pages/Setting'))
const VerifyUser = React.lazy(() => import('../pages/VerifyUser'))
const Blog = React.lazy(() => import('../pages/Blog'))
const UserProfile = React.lazy(() => import('../pages/UserProfile'))
const Search = React.lazy(() => import('../pages/Search'))

const AppRouter = () => {
	return (
		<Suspense fallback={<SuspenseLoader />}>
			<BrowserRouter>
				<CustomAlert />
				<ScrollToTop />
				<CheckNetworkStatus />
				<Auth />
				<Navbar />
				<Box
					id="content"
					sx={{
						overflow: 'auto',
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
								<Route path="/profile/:userName" element={<UserProfile />} />
								<Route
									path="/settings"
									element={<ProtectedRoute component={<Setting />} />}
								/>
								<Route
									path="/verifyUser"
									element={<NotProtectedRoute component={<VerifyUser />} />}
								/>
								<Route
									path="/resetpassword"
									element={<NotProtectedRoute component={<ResetPassword />} />}
								/>
								<Route
									path="/add"
									element={<ProtectedRoute component={<AddorUpdateBlog />} />}
								/>
								<Route
									path="/update/:id"
									element={<ProtectedRoute component={<AddorUpdateBlog />} />}
								/>
								<Route path="/blog/:slug" element={<Blog />} />
								<Route path="/search/" element={<Search />} />
								<Route
									path="stories"
									element={<ProtectedRoute component={<Stories />} />}>
									<Route
										path="draft"
										element={
											<GetStories key={'draft-stories'} isPublished={false} />
										}
									/>
									<Route
										path="published"
										element={
											<GetStories
												key={'published-stories'}
												isPublished={true}
											/>
										}
									/>
								</Route>
								<Route
									path="list"
									element={<ProtectedRoute component={<List />} />}>
									<Route
										path="bookmarks"
										element={
											<GetList key="bookmarks-stories" type="bookmarks" />
										}
									/>
									<Route
										path="previouslyRead"
										element={
											<GetList
												key="previouslyRead-stories"
												type="previouslyRead"
											/>
										}
									/>
								</Route>
								<Route
									path="/notifications"
									element={<ProtectedRoute component={<Notifications />} />}
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
