import { getIframeHeight } from '../api/blogAPI'

export const youtubeIframeHeight = async (
	obj: HTMLIFrameElement,
	blockContentWidth: number
) => {
	try {
		console.log(blockContentWidth)
		const response = await getIframeHeight('', 'youtube', blockContentWidth)
		obj.height = response.data.height
	} catch (error) {
		console.log('youtubeIframeHeight', error)
	}
}

export const vimeoIframeHeight = async (obj: HTMLIFrameElement) => {
	const blockContentWidth =
		document.querySelector('.ce-block__content')?.clientWidth!
	try {
		const response = await getIframeHeight('', 'vimeo', blockContentWidth)
		obj.height = response.data.height
	} catch (error) {
		console.log('vimeoIframeHeight', error)
	}
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

export const gfycatIframeHeight = async (
	obj: HTMLIFrameElement,
	blockContentWidth: number
) => {
	try {
		const response = await getIframeHeight('', 'gfycat', blockContentWidth)
		obj.height = response.data.height
	} catch (error) {
		console.log('gfycaIframeHeight', error)
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
