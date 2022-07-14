import { Chip } from '@mui/material'

type variantType = 'filled' | 'outlined' | undefined

type IProps = {
	label: string
	variant?: variantType
}

const SmallChip = ({ label, variant }: IProps) => {
	return (
		<Chip
			sx={{ height: 'auto', padding: '0.25rem' }}
			label={label}
			variant={variant}
		/>
	)
}
export default SmallChip
