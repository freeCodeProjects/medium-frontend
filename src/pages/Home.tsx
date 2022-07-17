import { Box } from '@mui/material'
import Hero from '../components/home/Hero'
import TrendingBlog from '../components/home/TrendingBlog'
import LatestStories from '../components/home/LatestBlog'

const Home = () => {
	return (
		<Box>
			<Hero />
			<TrendingBlog />
			<Box component="hr" sx={{ width: '100%', opacity: '20%' }} />
			<LatestStories />
		</Box>
	)
}
export default Home
