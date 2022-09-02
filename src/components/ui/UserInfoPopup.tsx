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
import UserName from './UserName'

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
						},
						p: '0.25rem'
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
						<UserName name={author.name} userName={author.userName} />
					</Box>
					<Typography
						variant="subtitle2"
						className="truncate-2"
						sx={{ pt: '0.5rem' }}>
						{author.bio}
					</Typography>
					<Divider sx={{ pt: '0.5rem' }} />
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							pt: '0.5rem',
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
