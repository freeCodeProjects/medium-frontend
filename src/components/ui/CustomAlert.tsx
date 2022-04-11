import { Snackbar, Alert } from '@mui/material'
import { useAppStore } from '../../store/appStore'

const CustomAlert = () => {
	const { openAlert, handleCloseAlert, alertType, alertMessage } = useAppStore()
	return (
		<div>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={openAlert}
				autoHideDuration={4000}
				onClose={handleCloseAlert}>
				<Alert
					onClose={handleCloseAlert}
					severity={alertType}
					sx={{ width: '100%', maxWidth: 600 }}>
					{alertMessage}
				</Alert>
			</Snackbar>
		</div>
	)
}
export default CustomAlert
