import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Stack, Tab } from '@mui/material'
import BoldTypography from '../components/ui/BoldTypography'
import { useState } from 'react'
import DraftStories from '../components/stories/DraftStories'
import PublishedStories from '../components/stories/PublishedStories'

const Stories = () => {
	const [value, setValue] = useState('1')

	const handleChange = (event: React.SyntheticEvent, newValue: '1' | '2') => {
		setValue(newValue)
	}

	return (
		<Stack rowGap={0.5} sx={{ my: '1rem' }}>
			<BoldTypography variant="h5">Your Story</BoldTypography>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label="Blog tabs">
						<Tab label="Draft" value="1" />
						<Tab label="Published" value="2" />
					</TabList>
				</Box>
				<TabPanel value="1">
					<DraftStories />
				</TabPanel>
				<TabPanel value="2">
					<PublishedStories />
				</TabPanel>
			</TabContext>
		</Stack>
	)
}
export default Stories
