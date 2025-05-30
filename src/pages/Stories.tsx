import { TabContext, TabList } from '@mui/lab'
import { Box, Button, Stack, Tab } from '@mui/material'
import BoldTypography from '../components/ui/BoldTypography'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

const Stories = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [value, setValue] = useState('1')

	const handleChange = (event: React.SyntheticEvent, newValue: '1' | '2') => {
		setValue(newValue)
		if (newValue === '1') {
			navigate('/stories/draft')
		} else {
			navigate('/stories/published')
		}
	}

	useEffect(() => {
		if (location.pathname === '/stories') {
			navigate('/stories/draft', { replace: true })
		} else {
			if (location.pathname.includes('draft')) {
				setValue('1')
			} else {
				setValue('2')
			}
		}
	}, [location.pathname])

	return (
		<Stack rowGap={2} sx={{ mt: '2rem', mb: '1rem' }}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<BoldTypography variant="h5">Your Story</BoldTypography>
				<Button variant="outlined" onClick={() => navigate('/add')}>
					New Story
				</Button>
			</Box>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label="Blog tabs">
						<Tab label="Draft" value="1" />
						<Tab label="Published" value="2" />
					</TabList>
				</Box>
				<Box sx={{ p: '1rem' }}>
					<Outlet />
				</Box>
			</TabContext>
		</Stack>
	)
}
export default Stories
