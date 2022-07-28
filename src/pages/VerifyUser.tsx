import { Box, CircularProgress, Typography } from '@mui/material'
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { verifyUser } from '../api/userAPI'
import { useAppStore } from '../store/appStore'
import { AppContext } from '../context/AppContext'

const VerifyUser = () => {
	const { setAlertData, setUser } = useAppStore()
	const { serverErrorHandler } = useContext(AppContext)
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const [token, setToken] = useState('')

	const { refetch } = useQuery(['verifyUser'], () => verifyUser(token), {
		enabled: false,
		onError: (error: any) => {
			serverErrorHandler(error)
		},
		onSuccess: (data: any) => {
			setAlertData('Account verified and Logged in.')
			setUser(data.data.user)
		},
		onSettled: () => {
			navigate('/', { replace: true })
		}
	})

	useEffect(() => {
		const tokenQuery = searchParams.get('token')!

		if (!tokenQuery) {
			navigate('/')
		}
		setToken(tokenQuery)
	}, [])

	useEffect(() => {
		if (token) {
			refetch()
		}
	}, [token])

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				justifyContent: 'center',
				alignItems: 'center',
				height: '90%'
			}}>
			<Typography variant="h5"> Verifying account</Typography>
			<CircularProgress color="success" sx={{ p: '10px' }} />
		</Box>
	)
}
export default VerifyUser
