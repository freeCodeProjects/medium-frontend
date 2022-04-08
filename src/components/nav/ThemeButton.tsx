import LightModeIcon from '@mui/icons-material/LightMode'
import NightlightRoundIcon from '@mui/icons-material/NightlightRound'
import IconButton from '@mui/material/IconButton'
import { useThemeStore } from '../../store/themeStore'

const ThemeButton = () => {
	const { theme, changeTheme } = useThemeStore()

	return (
		<IconButton color="default" sx={{ ml: 1 }} onClick={changeTheme}>
			{theme === 'dark' ? <LightModeIcon /> : <NightlightRoundIcon />}
		</IconButton>
	)
}
export default ThemeButton
