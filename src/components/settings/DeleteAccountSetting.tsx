import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
	TextField,
	Typography
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { forwardRef, useState, useContext } from 'react'
import { useQuery } from 'react-query'
import BoldTypography from '../ui/BoldTypography'
import { deleteUser as deleteUserAPI } from '../../api/userAPI'
import { AppContext } from '../../context/AppContext'
import { useAppStore } from '../../store/appStore'

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />
})

const DeleteAccountSetting = () => {
	const [open, setOpen] = useState(false)
	const [input, setInput] = useState('')
	const { serverErrorHandler, checkIsOnlineWrapper } = useContext(AppContext)
	const { deleteUser, setAlertData } = useAppStore()

	const { refetch: deleteUserTrigger } = useQuery('deleteUser', () => checkIsOnlineWrapper(deleteUserAPI), {
		enabled: false,
		onError: (error: any) => {
			serverErrorHandler(error)
		},
		onSuccess: (data: any) => {
			deleteUser()
			setAlertData('Account deleted.')
		}
	})

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<Box
			sx={{
				mt: 3,
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				justifyContent: 'start'
			}}>
			<BoldTypography variant="h6">Delete Account</BoldTypography>
			<Typography variant="body1">
				Permanently delete your account and all of your content.
			</Typography>
			<Button
				variant="outlined"
				color="error"
				sx={{ width: 172 }}
				onClick={handleClickOpen}>
				Delete Account
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description">
				<DialogTitle sx={{ textAlign: 'center' }}>
					Confirm account deletion
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						We’re sorry to see you go. Once your account is deleted, all of your
						content will be permanently gone, including your profile, stories,
						publications, notes, and responses. This action cannot be reverted.
					</DialogContentText>
					<Box
						sx={{
							mt: 1,
							display: 'flex',
							flexDirection: 'column',
							gap: 1,
							alignItems: 'center'
						}}>
						<DialogContentText>
							To confirm deletion, type <b>"delete"</b> below:
						</DialogContentText>
						<TextField
							size="small"
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => deleteUserTrigger()}
						color="error"
						disabled={input != 'delete'}>
						Delete
					</Button>
					<Button onClick={handleClose} color="inherit">
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}
export default DeleteAccountSetting
