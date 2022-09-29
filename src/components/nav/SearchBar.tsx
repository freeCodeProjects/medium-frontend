import {
	alpha,
	InputBase,
	styled,
	Autocomplete,
	Typography
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import useDebounce from '../../hooks/useDebounce'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { autocompleteBlog } from '../../api/blogAPI'
import { useNavigate } from 'react-router'

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25)
	},
	marginLeft: 0,
	width: '100%'
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		minWidth: '12rem !important'
	}
}))

const SearchBar = () => {
	const navigate = useNavigate()
	const [text, setText] = useState('')
	const searchText = useDebounce(text, 200)

	const { refetch, data, isLoading } = useQuery(
		['autocomplete', searchText],
		() => autocompleteBlog(searchText),
		{
			enabled: false,
			onError: (error: any) => {
				console.log(error)
			},
			staleTime: 10 * 60 * 1000
		}
	)
	useEffect(() => {
		if (searchText.length >= 3) {
			refetch()
		}
	}, [searchText])

	const autocompleteResult = data?.data || []

	return (
		<Autocomplete
			size="small"
			filterOptions={(x) => x}
			openOnFocus
			freeSolo
			disableClearable
			blurOnSelect
			onInputChange={(e, value, reason) => {
				if (reason === 'input') {
					setText(value)
				}
			}}
			onChange={(event, value, reason, details) => {
				if (reason === 'selectOption') {
					navigate(`/blog/${details?.option.slug}`)
				}
			}}
			onSubmit={(e) => console.log(e.target)}
			options={autocompleteResult}
			getOptionLabel={(option) => option?.publishedTitle || option}
			renderOption={(props, option) => (
				<Typography
					{...props}
					key={option._id}
					style={{
						fontSize: 14,
						padding: '0.5rem',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
						display: 'block'
					}}>
					{option.publishedTitle}
				</Typography>
			)}
			renderInput={(params) => {
				const { InputLabelProps, InputProps, ...rest } = params
				return (
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							onKeyDown={() => {
								console.log(text)
							}}
							{...rest}
							{...params.InputProps}
							style={{ fontSize: 14 }}
							placeholder="Search…"
						/>
					</Search>
				)
			}}
		/>
	)
}
export default SearchBar
