import { Box, Drawer, IconButton, Stack } from '@mui/material'
import BoldTypography from '../ui/BoldTypography'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import CommentForm from './CommentForm'

type IProps = {
	drawerToggle: boolean
	closeDrawer: React.MouseEventHandler<HTMLElement>
	postId: string
}

const Comment = ({ drawerToggle, closeDrawer, postId }: IProps) => {
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
			<Box sx={{ p: { xs: '0.5rem', sm: '1rem' } }}>
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
				<Box sx={{ py: '0.5rem' }}>
					<CommentForm postId={postId} relatedTo="blog" />
				</Box>
			</Box>
		</Drawer>
	)
}
export default Comment
