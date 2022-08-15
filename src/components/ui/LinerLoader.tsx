import { useTheme } from '@mui/material'

const LinerLoader = () => {
	const theme = useTheme()
	return (
		<svg
			version="1.1"
			id="L4"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			viewBox="0 0 100 100"
			enable-background="new 0 0 0 0"
			xmlSpace="preserve">
			<circle
				stroke={theme.palette.text.primary}
				fill={theme.palette.text.primary}
				cx="6"
				cy="50"
				r="6">
				<animate
					attributeName="opacity"
					dur="1s"
					values="0;1;0"
					repeatCount="indefinite"
					begin="0.1"
				/>
			</circle>
			<circle
				stroke={theme.palette.text.primary}
				fill={theme.palette.text.primary}
				cx="26"
				cy="50"
				r="6">
				<animate
					attributeName="opacity"
					dur="1s"
					values="0;1;0"
					repeatCount="indefinite"
					begin="0.2"
				/>
			</circle>
			<circle
				stroke={theme.palette.text.primary}
				fill={theme.palette.text.primary}
				cx="46"
				cy="50"
				r="6">
				<animate
					attributeName="opacity"
					dur="1s"
					values="0;1;0"
					repeatCount="indefinite"
					begin="0.3"
				/>
			</circle>
		</svg>
	)
}
export default LinerLoader
