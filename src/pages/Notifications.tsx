import { Container, Divider, Stack } from '@mui/material'
import BoldTypography from '../components/ui/BoldTypography'

const Notifications = () => {
	return (
		<Container maxWidth="md">
			<Stack rowGap={2} sx={{ mt: '2rem', mb: '1rem' }}>
				<BoldTypography variant="h5">Notifications</BoldTypography>
				<Divider />
			</Stack>
		</Container>
	)
}
export default Notifications
