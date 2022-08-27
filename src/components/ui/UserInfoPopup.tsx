import {
	Avatar,
	Box,
	Divider,
	styled,
	Tooltip,
	tooltipClasses,
	TooltipProps,
	Typography
} from '@mui/material'
import { UserPreview } from '../../types/userTypes'
import BoldTypography from './BoldTypography'
import FollowButton from './FollowButton'

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip
		{...props}
		classes={{ popper: className }}
		placement="bottom-start"
	/>
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.primary,
		maxWidth: 380
	}
}))

const UserInfoPopup = ({
	children,
	author
}: {
	children: React.ReactElement<any, any> & React.ReactNode
	author: UserPreview
}) => {
	return (
		<HtmlTooltip
			title={
				<Box
					onClick={(e) => {
						e.preventDefault()
						e.stopPropagation()
					}}
					sx={{
						width: {
							xs: 300,
							lg: 360
						}
					}}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: '0.5rem'
						}}>
						<Avatar
							sx={{ width: 48, height: 48 }}
							alt={author.name}
							src={author.photo}
						/>
						<BoldTypography className="truncate-2" variant="subtitle2">
							{author.name}
						</BoldTypography>
					</Box>
					<Typography
						variant="subtitle2"
						className="truncate-2"
						sx={{ pt: '0.5rem' }}>
						{author.bio}
					</Typography>
					<Divider />
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							p: '0.25rem',
							alignItems: 'center'
						}}>
						<BoldTypography variant="subtitle2">
							{`${author.followerCount} Followers`}
						</BoldTypography>
						<FollowButton userId={author._id} />
					</Box>
				</Box>
			}>
			{children}
		</HtmlTooltip>
	)
}
export default UserInfoPopup
