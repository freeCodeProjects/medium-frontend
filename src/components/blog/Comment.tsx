import {
	Box,
	Divider,
	Drawer,
	FormControl,
	IconButton,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Stack
} from '@mui/material'
import BoldTypography from '../ui/BoldTypography'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import CommentForm from './CommentForm'
import { Fragment, useState, useEffect } from 'react'
import CommentList from './CommentList'
import { useQueryClient } from '@tanstack/react-query'

type IProps = {
	drawerToggle: boolean
	closeDrawer: React.MouseEventHandler<HTMLElement>
	postId: string
	responsesCount: number
}

const Comment = ({
	drawerToggle,
	closeDrawer,
	postId,
	responsesCount
}: IProps) => {
	const [sortBy, setSortBy] = useState<'top' | 'latest'>('top')
	const [formToggle, setFormToggle] = useState(true)
	const queryClient = useQueryClient()

	const handleChange = (event: SelectChangeEvent) => {
		setSortBy(event.target.value as 'top' | 'latest')
	}

	useEffect(() => {
		queryClient.resetQueries(['comments', postId, sortBy])
	}, [sortBy])

	return (
		<Drawer
			anchor={'right'}
			open={drawerToggle}
			onClose={closeDrawer}
			PaperProps={{
				sx: {
					width: {
						xs: '100%',
						sm: '420px'
					}
				}
			}}>
			<Box sx={{ p: { xs: '0.5rem', sm: '1rem' }, position: 'relative' }}>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					spacing={2}>
					<BoldTypography variant="h6">Responses(0)</BoldTypography>
					<IconButton aria-label="close" onClick={closeDrawer}>
						<CloseOutlinedIcon />
					</IconButton>
				</Stack>
				<Box sx={{ py: '0.5rem', mb: '1rem' }}>
					{formToggle ? (
						<CommentForm
							postId={postId}
							relatedTo="blog"
							closeForm={() => setFormToggle(false)}
						/>
					) : (
						<Paper
							onClick={() => setFormToggle(true)}
							sx={{ p: '1rem', cursor: 'pointer' }}>
							What are your thoughts?
						</Paper>
					)}
				</Box>
				{responsesCount > 0 && (
					<Fragment>
						<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
							<Select
								variant="standard"
								value={sortBy}
								onChange={handleChange}
								disableUnderline>
								<MenuItem value={'top'}>Relevent</MenuItem>
								<MenuItem value={'recent'}>Recent</MenuItem>
							</Select>
						</FormControl>
						<Divider sx={{ position: 'absolute', left: 0, right: 0 }} />
					</Fragment>
				)}
				<CommentList postId={postId} sortBy={sortBy} relatedTo="blog" />
			</Box>
		</Drawer>
	)
}
export default Comment
