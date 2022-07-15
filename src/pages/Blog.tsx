import { Box } from '@mui/material'
import { useContext } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getBlogBySlug } from '../api/blogAPI'
import Loader from '../components/ui/Loader'
import { AppContext } from '../context/AppContext'
import NotFound from '../components/ui/NotFound'
import Editor from '../components/blog/Editor'

const Blog = () => {
	const params = useParams()

	const { serverErrorHandler } = useContext(AppContext)

	const {
		isLoading,
		isError,
		data: blog
	} = useQuery(['blogBySlug', params.slug], () => getBlogBySlug(params.slug!), {
		onError: (error: any) => {
			console.log(error)
			serverErrorHandler(error)
		},
		staleTime: 10 * 60 * 1000
	})

	return (
		<Box>
			{isLoading ? (
				<Loader />
			) : isError ? (
				<NotFound message="Blog Not found." />
			) : (
				<Editor data={blog.data.publishedContent} readOnly={true} />
			)}
		</Box>
	)
}
export default Blog
