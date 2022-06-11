import { TextField } from '@mui/material'
import { randomString } from '../../utils/helper'

type IProps = {
	title: string
	setTitle: Function
}

const BlogTitle = ({ title, setTitle }: IProps) => {
	//using random id as name to avoid autoComplete
	const id = randomString(6)
	return (
		<TextField
			value={title}
			onChange={(e) => setTitle(e.target.value)}
			fullWidth
			InputProps={{
				disableUnderline: true,
				sx: {
					fontSize: {
						xs: '1.5rem',
						md: '2rem'
					}
				}
			}}
			name={id}
			variant="standard"
			placeholder="Title"
			sx={{ maxWidth: 650, margin: '0 auto', border: 0 }}
		/>
	)
}
export default BlogTitle
