import { Box, Divider } from '@mui/material'
import Hero from '../components/home/Hero'
import TrendingBlog from '../components/home/TrendingBlog'
import LatestStories from '../components/home/LatestBlog'

const Home = () => {
	return (
		<Box>
			<Hero />
			<TrendingBlog />
			<Divider />
			<LatestStories />
		</Box>
	)
}
export default Home
