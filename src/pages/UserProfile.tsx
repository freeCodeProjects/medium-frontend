import { Avatar, Box, Divider, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getUserById, getUserByUserName } from '../api/userAPI'
import GetUserPublicBlogs from '../components/profile/GetUserPublicBlogs'
import BoldTypography from '../components/ui/BoldTypography'
import FollowButton from '../components/ui/FollowButton'
import Loader from '../components/ui/Loader'
import NotFound from '../components/ui/NotFound'
const UserProfile = () => {
	const params = useParams()
	const userName = params.userName

	const {
		data: userData,
		isLoading,
		isError
	} = useQuery(
		['userByUserName', params.userName],
		() => getUserByUserName(userName!),
		{
			refetchOnMount: 'always'
		}
	)

	//refetch user using id so we can sync follower count on frontend
	const { data: profile } = useQuery(
		['userById', userData?.data._id],
		() => getUserById(userData?.data._id!),
		{
			refetchOnMount: 'always',
			enabled: !!userData
		}
	)

	return isLoading ? (
		<Loader />
	) : isError ? (
		<NotFound message="Profile Not found." />
	) : (
		<Box
			sx={{
				display: 'flex',
				py: '2rem',
				flexDirection: { xs: 'column', md: 'row' },
				gap: '1rem'
			}}>
			<Box
				sx={{
					display: 'flex',
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					position: { md: 'fixed' },
					top: 64,
					bottom: 64,
					maxWidth: { xs: '900px', md: '220px' }
				}}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'row', md: 'column', gap: '1rem' }
					}}>
					<Avatar
						alt={profile?.data.name}
						src={profile?.data.photo}
						sx={{
							width: { xs: 64, sm: 120 },
							height: { xs: 64, sm: 120 },
							alignSelf: { xs: 'start', md: 'center' }
						}}
					/>
					<Box
						sx={{
							display: 'flex',
							gap: '0.5rem',
							flexDirection: 'column',
							alignItems: { md: 'center' }
						}}>
						<BoldTypography>{profile?.data.name!}</BoldTypography>
						<Typography
							variant="subtitle2"
							sx={{ textAlign: { md: 'center' } }}>
							{profile?.data.bio}
						</Typography>
						<Box
							sx={{
								display: 'flex',
								flexDirection: { md: 'column' },
								flexWrap: 'wrap',
								gap: '2rem',
								alignItems: 'center'
							}}>
							<BoldTypography>{`${profile?.data.followerCount} followers`}</BoldTypography>
							<FollowButton userId={profile?.data._id!} />
						</Box>
					</Box>
				</Box>
			</Box>
			<Box maxWidth="md" sx={{ marginLeft: { md: '240px' } }}>
				<Stack gap={2}>
					<Typography
						sx={{ display: { xs: 'none', md: 'block' } }}
						variant="h3">
						{profile?.data.name}
					</Typography>
					<Divider sx={{ display: { xs: 'none', md: 'block' } }} />
					<GetUserPublicBlogs userId={profile?.data._id!} />
				</Stack>
			</Box>
		</Box>
	)
}
export default UserProfile
