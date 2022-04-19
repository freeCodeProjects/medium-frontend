import { Container } from '@mui/material'
import CustomDivider from '../components/ui/CustomDivider'
import BoldTypography from '../components/ui/BoldTypography'
import NameSetting from '../components/settings/NameSetting'
import BioSetting from '../components/settings/BioSetting'
import { useAppStore } from '../store/appStore'
import PhotoSetting from '../components/settings/PhotoSetting'
import UserNameSetting from '../components/settings/UserNameSetting'

const Setting = () => {
	const { user } = useAppStore()
	return (
		<Container maxWidth="md" sx={{ padding: { xs: '2rem 0' } }}>
			<BoldTypography variant="h4">Settings</BoldTypography>
			<CustomDivider />
			{user && (
				<>
					<NameSetting />
					<BioSetting />
					<PhotoSetting />
					<UserNameSetting />
				</>
			)}
		</Container>
	)
}
export default Setting
