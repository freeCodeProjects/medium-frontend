import {
	Dialog,
	Button,
	DialogActions,
	Slide,
	Tabs,
	Tab,
	Box
} from '@mui/material'
import { useAppStore } from '../../store/appStore'
import { TransitionProps } from '@mui/material/transitions'
import { forwardRef, useState } from 'react'
import Signup from './Signup'
import Login from './Login'

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />
})

const Auth = () => {
	const { openAuthModal, handleCloseAuthModal } = useAppStore()
	const [value, setValue] = useState('login')

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue)
	}

	return (
		<div>
			<Dialog
				PaperProps={{
					sx: {
						height: 540
					}
				}}
				maxWidth="sm"
				fullWidth
				open={openAuthModal}
				TransitionComponent={Transition}
				keepMounted
				onClose={(event, reason) => {
					if (reason && reason == 'backdropClick') return
					handleCloseAuthModal()
				}}>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="inherit"
					variant="fullWidth">
					<Tab value="login" label="Login" />
					<Tab value="signup" label="SignUp" />
				</Tabs>
				<Box sx={{ pt: 4, flexGrow: 1 }}>
					{value === 'login' && <Login />}
					{value === 'signup' && <Signup />}
				</Box>
				<DialogActions>
					<Button onClick={handleCloseAuthModal} color="inherit">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
export default Auth
