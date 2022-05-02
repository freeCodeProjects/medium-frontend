//@ts-nocheck
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import Undo from 'editorjs-undo'
import ImageTool from '@editorjs/image'
import InlineImage from 'editorjs-inline-image'
import editorjsNestedChecklist from '@calumk/editorjs-nested-checklist'
import editorjsCodeflask from '@calumk/editorjs-codeflask'
import Embed from '@editorjs/embed'
import { useEffect, useRef, useContext } from 'react'
import {
	uploadEditorImageFile,
	updateEditorImageUrl,
	getIframeHeight
} from '../../api/blogAPI'
import { AppContext } from '../../context/AppContext'
import { validateFileSize, isFileImage } from '../../utils/helper'
import EditorNestedChecklistBlockInfoTune from '../../utils/editorNestedChecklistBlockInfoTune'
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

const Editor = ({ data, setData, isFocus }: IProps) => {
	const { serverErrorHandler } = useContext(AppContext)
	const ejInstance = useRef()

	async function resizeIframe(obj, source) {
		const blockContentWidth =
			document.querySelector('.ce-block__content')?.clientWidth
		if (source === 'youtube') {
			try {
				const response = await getIframeHeight('', 'youtube', blockContentWidth)
				obj.height = response.data.height
			} catch (error) {
				console.log('youtubeIframeHeight', error)
			}
		} else if (source === 'vimeo') {
			try {
				const response = await getIframeHeight('', 'vimeo', blockContentWidth)
				obj.height = response.data.height
			} catch (error) {
				console.log('vimeoIframeHeight', error)
			}
		} else if (source === 'gist') {
			const src = obj.src
				.substring(
					obj.src.indexOf('src='),
					obj.src.indexOf('>', obj.src.indexOf('src='))
				)
				.trim()

			console.log('src : ', src)
			try {
				const response = await getIframeHeight(
					src.substring(4),
					source,
					blockContentWidth
				)
				obj.height = response.data.height
				console.log(response)
			} catch (error) {
				console.log('gistIframeHeight', error)
			}
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
			const lottie = document.querySelector('#editorjs')!
			if (lottie?.childNodes.length > 1) {
				lottie.removeChild(lottie.childNodes[0])
			}
		}, 100)

		return () => {
			if (ejInstance.current) {
				ejInstance.current.destroy()
				ejInstance.current = null
			}
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
				editorNestedChecklistBlockInfoTune: EditorNestedChecklistBlockInfoTune,
				code: editorjsCodeflask,
				embed: {
					class: Embed,
					config: {
						services: {
							youtube: {
								regex:
									/(?:https?:\/\/)?(?:www\.)?(?:(?:youtu\.be\/)|(?:youtube\.com)\/(?:v\/|u\/\w\/|embed\/|watch))(?:(?:\?v=)?([^#&?=]*))?((?:[?&]\w*=\w*)*)/,
								embedUrl: 'https://www.youtube.com/embed/<%= remote_id %>',
								html: `<iframe style='width: 100%;' onload="resizeIframe(this, 'youtube')"  height="366" frameborder="0" allowfullscreen></iframe>`,
								height: 320,
								width: 580,
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
								html: `<iframe style="width:100%;" onload="resizeIframe(this, 'vimeo')" height="366" frameborder="0"></iframe>`,
								height: 320,
								width: 580
							},
							facebook: true,
							instagram: true,
							twitter: true,
							codepen: true,
							pinterest: true,
							gfycat: true,
							github: {
								regex: /https?:\/\/gist.github.com\/([^\/\?\&]*)\/([^\/\?\&]*)/,
								embedUrl:
									'data:text/html;charset=utf-8,<head><base target="_blank" /></head><body><script src=https://gist.github.com/<%= remote_id %> ></script></body>',
								html: `<iframe style='width: 100%;' height:"600" onload="resizeIframe(this, 'gist')" allowfullscreen frameborder="0" scrolling="auto" src=""></iframe>`,
								height: 1064,
								id: (groups) => groups.join('/')
							}
						}
					}
				},
				nestedchecklist: {
					class: editorjsNestedChecklist,
					tunes: ['editorNestedChecklistBlockInfoTune']
				},
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
