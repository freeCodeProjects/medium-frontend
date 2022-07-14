import { Typography } from '@mui/material'

type IProps = {
	message: string
}

const ErrorMessage = ({ message }: IProps) => {
	return (
		<Typography
			sx={{
				textAlign: 'center',
				marginY: '2rem',
				color: 'error.main'
			}}>
			{message}
		</Typography>
	)
}
export default ErrorMessage
