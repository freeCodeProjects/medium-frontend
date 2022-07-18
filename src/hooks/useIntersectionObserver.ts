import { useEffect, useState } from 'react'
const useIntersectionObserver = (
	currRef: any,
	defaultValue = false,
	options = {
		root: null,
		rootMargin: '0px',
		threshold: 0.1
	}
) => {
	const [intersecting, setIntersecting] = useState(defaultValue)

	useEffect(() => {
		const target = currRef.current

		if (target) {
			let observer = new IntersectionObserver(async (entries) => {
				if (entries[0].isIntersecting) {
					// console.log('intersecting')
					setIntersecting(true)
				} else {
					// console.log('notIntersecting')
					setIntersecting(false)
				}
			}, options)
			observer.observe(target)

			return () => observer.unobserve(target)
		}
	}, [currRef, options])

	return intersecting
}
export default useIntersectionObserver
