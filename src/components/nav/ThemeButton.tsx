import LightModeIcon from '@mui/icons-material/LightMode'
import NightlightRoundIcon from '@mui/icons-material/NightlightRound'
import IconButton from '@mui/material/IconButton'
import { useThemeStore } from '../../store/themeStore'

const ThemeButton = () => {
	const theme = useThemeStore((state) => state.theme)
	const changeTheme = useThemeStore((state) => state.changeTheme)

	return (
		<IconButton
			color="default"
			sx={{ ml: 1 }}
			onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}>
			{theme === 'dark' ? <LightModeIcon /> : <NightlightRoundIcon />}
		</IconButton>
	)
}
export default ThemeButton
