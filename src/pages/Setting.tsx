import { Container } from '@mui/material'
import CustomDivider from '../components/ui/CustomDivider'
import BoldTypography from '../components/ui/BoldTypography'
import NameSetting from '../components/settings/NameSetting'
import { useAppStore } from '../store/appStore'

const Setting = () => {
	const { user } = useAppStore()
	return (
		<Container maxWidth="md" sx={{ padding: { xs: '2rem 0' } }}>
			<BoldTypography variant="h4">Settings</BoldTypography>
			<CustomDivider />
			{user && (
				<>
					<NameSetting />
				</>
			)}
		</Container>
	)
}
export default Setting
