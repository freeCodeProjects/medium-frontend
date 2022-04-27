import { TextField } from '@mui/material'

type IProps = {
	title: string
	setTitle: Function
}

const BlogTitle = ({ title, setTitle }: IProps) => {
	return (
		<TextField
			value={title}
			onChange={(e) => setTitle(e.target.value)}
			fullWidth
			InputProps={{
				disableUnderline: true,
				sx: { fontSize: '2.5rem' }
			}}
			variant="standard"
			placeholder="Title"
			sx={{ maxWidth: 650, margin: '0 auto', border: 0 }}
		/>
	)
}
export default BlogTitle
