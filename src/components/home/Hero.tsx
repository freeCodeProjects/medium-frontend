import { Box, Button, Container, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import heroImage from '../../assets/hero.svg'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/appStore'

const Hero = () => {
	const navigate = useNavigate()
	const { isLoggedIn, handleOpenAuthModal } = useAppStore()

	const navigateToAddBlog = () => {
		if (!isLoggedIn) {
			handleOpenAuthModal()
		} else {
			navigate('/add')
		}
	}

	return (
		<Box
			sx={{
				minHeight: {
					xs: '50vh',
					md: '60vh'
				},
				width: '100vw',
				left: '50%',
				marginLeft: 'calc(-50vw - 8px)',
				position: 'relative',
				bgcolor: blueGrey[400],
				display: 'flex'
			}}>
			<Container
				maxWidth="xl"
				sx={{
					display: 'flex',
					padding: { xs: '2rem 2rem', sm: '3rem 3rem', md: '3rem 4rem' }
				}}>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						justifyContent: 'space-between',
						gap: '2rem'
					}}>
					<Box
						sx={{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-evenly',
							gap: '1rem'
						}}>
						<Box
							sx={{
								maxWidth: {
									xs: '360px',
									sm: '480px',
									md: '540px'
								}
							}}>
							<Typography
								variant="h2"
								sx={{ fontWeight: 'bold', whiteSpace: 'pre-line' }}>
								Medium is a place to write, read, and connect
							</Typography>
							<Typography variant="h6">
								It's easy and free to post your thinking on any topic and
								connect with millions of readers.
							</Typography>
						</Box>
						<Box>
							<Button onClick={navigateToAddBlog} variant="outlined">
								Start Writing
							</Button>
						</Box>
					</Box>
					<Box
						sx={{
							flex: 1,
							justifyContent: 'flex-end',
							display: { xs: 'none', md: 'flex' },
							maxWidth: '500px'
						}}>
						<img width="100%" src={heroImage} alt="Hero Image" />
					</Box>
				</Box>
			</Container>
		</Box>
	)
}
export default Hero
