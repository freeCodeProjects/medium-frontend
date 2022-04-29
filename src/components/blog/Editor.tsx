//@ts-nocheck
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import Undo from 'editorjs-undo'
import ImageTool from '@editorjs/image'
import InlineImage from 'editorjs-inline-image'
import editorjsNestedChecklist from '@calumk/editorjs-nested-checklist'
import { useEffect, useRef, useContext } from 'react'
import { uploadEditorImageFile, updateEditorImageUrl } from '../../api/blogAPI'
import { AppContext } from '../../context/AppContext'
import { validateFileSize, isFileImage } from '../../utils/helper'
import EditorBlockInfoTune from '../../utils/editorBlockInfoTune.ts'
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

	// This will run only once
	useEffect(() => {
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
				editorBlockInfoTune: EditorBlockInfoTune,
				nestedchecklist: {
					class: editorjsNestedChecklist,
					tunes: ['editorBlockInfoTune']
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
