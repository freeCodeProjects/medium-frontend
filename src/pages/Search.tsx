import { useParams, useSearchParams } from 'react-router-dom'
const Search = () => {
	const [searchParams] = useSearchParams()

	console.log(searchParams.get('q'))
	return <div></div>
}
export default Search
