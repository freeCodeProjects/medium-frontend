import { Box, Container, Stack, Tab } from '@mui/material'
import { useEffect, useState } from 'react'
import BoldTypography from '../components/ui/BoldTypography'
import { Outlet, useNavigate } from 'react-router-dom'
import { TabContext, TabList } from '@mui/lab'

const List = () => {
	const [value, setValue] = useState('1')
	const navigate = useNavigate()

	const handleChange = (event: React.SyntheticEvent, newValue: '1' | '2') => {
		setValue(newValue)
		if (newValue === '1') {
			navigate('/list/bookmarks')
		} else {
			navigate('/list/previouslyRead')
		}
	}

	useEffect(() => {
		if (location.pathname === '/list') {
			navigate('/list/bookmarks', { replace: true })
		} else {
			if (location.pathname.includes('bookmarks')) {
				setValue('1')
			} else {
				setValue('2')
			}
		}
	}, [location.pathname])

	return (
		<Container maxWidth="md">
			<Stack rowGap={2} sx={{ mt: '2rem', mb: '1rem' }}>
				<BoldTypography variant="h5">Your Story</BoldTypography>
				<TabContext value={value}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<TabList onChange={handleChange} aria-label="Blog tabs">
							<Tab label="Bookmarks" value="1" />
							<Tab label="Previously Read" value="2" />
						</TabList>
					</Box>
					<Box sx={{ p: '1rem' }}>
						<Outlet />
					</Box>
				</TabContext>
			</Stack>
		</Container>
	)
}
export default List
