import { useState, useEffect } from 'react'
const useDebounce = (value: any, delay: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)
		return () => {
			clearInterval(handler)
		}
	}, [value, delay])

	return debouncedValue
}
export default useDebounce
