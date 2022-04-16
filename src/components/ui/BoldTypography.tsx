import { Typography } from '@mui/material'

type variant =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'subtitle1'
	| 'subtitle2'
	| 'body1'
	| 'body2'
	| 'caption'
	| 'button'
	| 'overline'
	| 'inherit'
	| undefined

const BoldTypography = ({
	variant,
	children
}: {
	variant: variant
	children: React.ReactChild
}) => {
	return (
		<div>
			<Typography variant={variant} sx={{ fontWeight: '600' }}>
				{children}
			</Typography>
		</div>
	)
}
export default BoldTypography
