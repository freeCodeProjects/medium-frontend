import { getIframeHeight } from '../api/blogAPI'

export const youtubeIframeHeight = (
	obj: HTMLIFrameElement,
	blockContentWidth: number
) => {
	blockContentWidth = Math.min(blockContentWidth, 720)
	blockContentWidth = Math.max(blockContentWidth, 360)
	const [x1, y1, x2, y2] = [428, 240, 650, 366]
	const m = (y2 - y1) / (x2 - x1)
	const newHeight = m * (blockContentWidth - x1) + y1
	obj.height = Math.round(newHeight).toString()
}

export const vimeoIframeHeight = (
	obj: HTMLIFrameElement,
	blockContentWidth: number
) => {
	blockContentWidth = Math.min(blockContentWidth, 720)
	blockContentWidth = Math.max(blockContentWidth, 360)
	const [x1, y1, x2, y2] = [384, 216, 650, 366]
	const m = (y2 - y1) / (x2 - x1)
	const newHeight = m * (blockContentWidth - x1) + y1
	obj.height = Math.round(newHeight).toString()
}

export const gfycatIframeHeight = (
	obj: HTMLIFrameElement,
	blockContentWidth: number
) => {
	blockContentWidth = Math.min(blockContentWidth, 720)
	blockContentWidth = Math.max(blockContentWidth, 360)
	const [x1, y1, x2, y2] = [360, 326, 650, 436]
	const m = (y2 - y1) / (x2 - x1)
	const newHeight = m * (blockContentWidth - x1) + y1
	obj.height = Math.round(newHeight).toString()
}

export const codepenIframeHeight = (
	obj: HTMLIFrameElement,
	blockContentWidth: number
) => {
	blockContentWidth = Math.min(blockContentWidth, 720)
	blockContentWidth = Math.max(blockContentWidth, 360)

	obj.height = blockContentWidth.toString()
}

export const gistIframeHeight = async (
	obj: HTMLIFrameElement,
	blockContentWidth: number
) => {
	const src = obj.src
		.substring(
			obj.src.indexOf('src='),
			obj.src.indexOf('>', obj.src.indexOf('src='))
		)
		.trim()

	try {
		const response = await getIframeHeight(
			src.substring(4),
			'gist',
			blockContentWidth
		)
		obj.height = response.data.height
		console.log(response)
	} catch (error) {
		console.log('gistIframeHeight', error)
	}
}

export const instagramIframeHeight = async (
	obj: HTMLIFrameElement,
	blockContentWidth: number
) => {
	try {
		const response = await getIframeHeight(
			obj.src,
			'instagram',
			blockContentWidth
		)
		obj.height = response.data.height
		console.log(response)
	} catch (error) {
		console.log('instagramIframeHeight', error)
	}
}

export const twitterIframeHeight = async (
	obj: HTMLIFrameElement,
	blockContentWidth: number
) => {
	try {
		const response = await getIframeHeight(
			obj.src,
			'twitter',
			blockContentWidth
		)
		obj.height = response.data.height
		console.log(response)
	} catch (error) {
		console.log('twitterIframeHeight', error)
	}
}

export const pinterestIframeHeight = async (
	obj: HTMLIFrameElement,
	blockContentWidth: number
) => {
	try {
		const response = await getIframeHeight(
			obj.src,
			'pinterest',
			blockContentWidth
		)
		obj.height = response.data.height
		console.log(response)
	} catch (error) {
		console.log('pinterestIframeHeight', error)
	}
}
