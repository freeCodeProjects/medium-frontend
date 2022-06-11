//@ts-nocheck
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import Undo from 'editorjs-undo'
import ImageTool from '@editorjs/image'
import InlineImage from 'editorjs-inline-image'
import Embed from '@editorjs/embed'
import LinkTool from '@editorjs/link'
import Quote from '@editorjs/quote'
import Delimiter from '@editorjs/delimiter'
import List from '@editorjs/list'
import Checklist from '@editorjs/checklist'
import Code from '@editorjs/code'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'
import Underline from '@editorjs/underline'
import Hyperlink from 'editorjs-hyperlink'
import { useEffect, useRef, useContext } from 'react'
import { uploadEditorImageFile, updateEditorImageUrl } from '../../api/blogAPI'
import { AppContext } from '../../context/AppContext'
import { validateFileSize, isFileImage } from '../../utils/helper'
import {
	codepenIframeHeight,
	pinterestIframeHeight
} from '../../utils/iframeHeight'
import {
	youtubeIframeHeight,
	vimeoIframeHeight,
	gistIframeHeight,
	gfycatIframeHeight,
	instagramIframeHeight,
	twitterIframeHeight
} from '../../utils/iframeHeight'

type IProps = {
	data: object | null
	setData: Function
	isFocus?: boolean
}

const EDITTOR_HOLDER_ID = 'editorjs'

const removeImageBlockAndNotificationOnError = () => {
	//manually delete the image-tool loading element. This occur when catching error on frontend because element is not created before we throw error. That's why using setTimeOut.
	setTimeout(() => {
		document.querySelector('.image-tool--loading')?.remove()
		document.querySelector('.image-tool--empty')?.remove()
		document.querySelector('.cdx-notify')?.remove()
	}, 50)
}

let resizeWindowTimeout = undefined

const reloadIframeOnResize = () => {
	clearInterval(resizeWindowTimeout)
	resizeWindowTimeout = setTimeout(() => {
		const iframes = document.querySelectorAll('iframe')
		iframes.forEach((iframe) => {
			//force update src to re-render
			iframe.src += ''
		})
	}, 1000)
}

const Editor = ({ data, setData, isFocus }: IProps) => {
	const { serverErrorHandler } = useContext(AppContext)
	const ejInstance = useRef()

	async function resizeIframe(obj, source) {
		const blockContentWidth =
			document.querySelector('.ce-block__content')?.clientWidth!
		if (source === 'youtube') {
			youtubeIframeHeight(obj, blockContentWidth)
		} else if (source === 'vimeo') {
			vimeoIframeHeight(obj, blockContentWidth)
		} else if (source === 'gfycat') {
			gfycatIframeHeight(obj, blockContentWidth)
		} else if (source === 'codepen') {
			codepenIframeHeight(obj, blockContentWidth)
		} else if (source === 'gist') {
			gistIframeHeight(obj, blockContentWidth)
		} else if (source === 'instagram') {
			instagramIframeHeight(obj, blockContentWidth)
		} else if (source === 'twitter') {
			twitterIframeHeight(obj, blockContentWidth)
		} else if (source === 'pinterest') {
			pinterestIframeHeight(obj, blockContentWidth)
		}
	}

	// This will run only once
	useEffect(() => {
		document.resizeIframe = resizeIframe
		if (!ejInstance.current) {
			initEditor()
		}

		//below code will remove multipe editor created in development mode
		setTimeout(() => {
			const editor = document.querySelector('#editorjs')!
			if (editor?.childNodes.length > 1) {
				editor.removeChild(editor.childNodes[1])
			}
		}, 100)

		return () => {
			if (ejInstance.current) {
				ejInstance.current.destroy()
				ejInstance.current = null
			}
		}
	}, [])

	useEffect(() => {
		window.addEventListener('resize', reloadIframeOnResize)

		return () => {
			window.removeEventListener('resize', reloadIframeOnResize)
		}
	}, [])

	const initEditor = () => {
		const editor = new EditorJS({
			holder: EDITTOR_HOLDER_ID,
			logLevel: 'ERROR',
			placeholder: 'Tell your story...',
			data,
			onReady: () => {
				ejInstance.current = editor
				new Undo({ editor })
				//focus to end of the cursor
				if (isFocus) {
					editor.focus(true)
				}
			},
			onChange: async (api) => {
				let content = await api.saver.save()
				// Put your logic here to save this data to your DB

				if (content) {
					setData(content)
				}
			},
			tools: {
				header: {
					class: Header,
					config: {
						levels: [2, 3, 4],
						defaultLevel: 3
					}
				},
				image: {
					class: ImageTool,
					config: {
						uploader: {
							async uploadByFile(file) {
								try {
									const isValidFileSize = validateFileSize(file, 3)
									if (!isValidFileSize) {
										throw Error('File size is more than 3 MB.')
									}

									const res = await uploadEditorImageFile(file)
									return res.data
								} catch (error) {
									serverErrorHandler(error)
									removeImageBlockAndNotificationOnError()
								}
							},
							async uploadByUrl(url) {
								try {
									const fileImg = await fetch(url)
										.then((r) => r.blob())
										.catch((error) => {
											throw Error('Incorrect file provided.')
										})

									const isImage = isFileImage(fileImg)
									if (!isImage) {
										throw Error('File is not image.')
									}

									const isValidFileSize = validateFileSize(fileImg, 3)
									if (!isValidFileSize) {
										throw Error('File size is more than 3 MB.')
									}

									const res = await updateEditorImageUrl(url)
									return res.data
								} catch (error) {
									serverErrorHandler(error)
									removeImageBlockAndNotificationOnError()
								}
							}
						}
					}
				},
				inlineImage: {
					class: InlineImage,
					config: {
						embed: {
							display: true
						},
						unsplash: {
							appName: 'Pixabay Clone',
							clientId: import.meta.env.VITE_UNSPLASH_SECRET
						}
					}
				},
				list: List,
				checklist: Checklist,
				code: Code,
				quote: Quote,
				delimiter: Delimiter,
				Marker: {
					class: Marker,
					shortcut: 'CMD+SHIFT+M'
				},
				inlineCode: {
					class: InlineCode,
					shortcut: 'CMD+SHIFT+M'
				},
				underline: Underline,
				hyperlink: {
					class: Hyperlink,
					config: {
						shortcut: 'CMD+L',
						target: '_blank',
						rel: 'nofollow',
						validate: false
					}
				},
				link: {
					class: LinkTool,
					config: {
						endpoint: 'http://localhost:3001/api/blog/editor/fetchUrl'
					}
				},
				embed: {
					class: Embed,
					config: {
						services: {
							youtube: {
								regex:
									/(?:https?:\/\/)?(?:www\.)?(?:(?:youtu\.be\/)|(?:youtube\.com)\/(?:v\/|u\/\w\/|embed\/|watch))(?:(?:\?v=)?([^#&?=]*))?((?:[?&]\w*=\w*)*)/,
								embedUrl: 'https://www.youtube.com/embed/<%= remote_id %>',
								html: `<iframe style='width: 100%; max-width: 650px;' onload="resizeIframe(this, 'youtube')"  height="366" frameborder="0" allowfullscreen></iframe>`,
								height: 366,
								width: 650,
								id: ([id, params]) => {
									if (!params && id) {
										return id
									}

									const paramsMap = {
										start: 'start',
										end: 'end',
										t: 'start',
										// eslint-disable-next-line camelcase
										time_continue: 'start',
										list: 'list'
									}

									params = params
										.slice(1)
										.split('&')
										.map((param) => {
											const [name, value] = param.split('=')

											if (!id && name === 'v') {
												id = value

												return null
											}

											if (!paramsMap[name]) {
												return null
											}

											return `${paramsMap[name]}=${value}`
										})
										.filter((param) => !!param)

									return id + '?' + params.join('&')
								}
							},
							vimeo: {
								regex:
									/(?:http[s]?:\/\/)?(?:www.)?(?:player.)?vimeo\.co(?:.+\/([^\/]\d+)(?:#t=[\d]+)?s?$)/,
								embedUrl:
									'https://player.vimeo.com/video/<%= remote_id %>?title=0&byline=0',
								html: `<iframe style="width:100%; max-width: 650px;" onload="resizeIframe(this, 'vimeo')" height="366" frameborder="0"></iframe>`,
								height: 366,
								width: 650
							},
							gfycat: {
								regex: /https?:\/\/gfycat\.com(?:\/detail)?\/([a-zA-Z]+)/,
								embedUrl: 'https://gfycat.com/ifr/<%= remote_id %>',
								html: `<iframe frameborder='0' scrolling='no' style="width:100%; max-width: 650px;" onload="resizeIframe(this, 'gfycat')" height='436' allowfullscreen ></iframe>`,
								height: 436,
								width: 650
							},
							instagram: {
								regex:
									/https?:\/\/www\.instagram\.com\/p\/([^\/\?\&]+)\/?(\?utm_source=ig_web_copy_link)?/,
								embedUrl: 'https://www.instagram.com/p/<%= remote_id %>/embed',
								html: `<iframe style="width:100%; max-width: 650px;" onload="resizeIframe(this, 'instagram')" height="600" frameborder="0" scrolling="no" allowtransparency="true"></iframe>`,
								height: 505,
								width: 400
							},
							twitter: {
								regex:
									/^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+?.*)?$/,
								embedUrl:
									'https://twitframe.com/show?url=https://twitter.com/<%= remote_id %>',
								html: `<iframe style="width:100%; max-width: 650px;" onload="resizeIframe(this, 'twitter')" height="600" style="margin: 0 auto;" frameborder="0" scrolling="no" allowtransparency="true"></iframe>`,
								height: 600,
								width: 650,
								id: (ids) => ids.join('/status/')
							},
							codepen: {
								regex:
									/https?:\/\/codepen\.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
								embedUrl:
									'https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2',
								html: `<iframe onload="resizeIframe(this, 'codepen')" height='600' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width:100%; max-width: 650px;''></iframe>`,
								height: 600,
								width: 650,
								id: (ids) => ids.join('/embed/')
							},
							github: {
								regex: /https?:\/\/gist.github.com\/([^\/\?\&]*)\/([^\/\?\&]*)/,
								embedUrl:
									'data:text/html;charset=utf-8,<head><base target="_blank" /></head><body><script src=https://gist.github.com/<%= remote_id %> ></script></body>',
								html: `<iframe style='width: 100%;' height:"600" onload="resizeIframe(this, 'gist')" allowfullscreen frameborder="0" scrolling="no"></iframe>`,
								height: 1064,
								id: (groups) => groups.join('/')
							},
							pinterest: {
								regex:
									/https?:\/\/([^\/\?\&]*).pinterest.com\/pin\/([^\/\?\&]*)\/?$/,
								embedUrl:
									'https://assets.pinterest.com/ext/embed.html?id=<%= remote_id %>',
								html: `<iframe style='width: 100%;' height="600" onload="resizeIframe(this, 'pinterest')" scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen></iframe>`,
								id: (ids) => {
									return ids[1]
								}
							}
						}
					}
				}
			}
		})
	}

	return (
		<>
			<div id={EDITTOR_HOLDER_ID}></div>
			<pre style={{ width: '100%', whiteSpace: 'pre-wrap' }}>
				{JSON.stringify(data, null, 4)}
			</pre>
		</>
	)
}

export default Editor
