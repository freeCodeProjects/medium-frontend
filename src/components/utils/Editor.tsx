//@ts-nocheck
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import Undo from 'editorjs-undo'
import { useEffect, useRef } from 'react'

type IProps = {
	data: object | null
	setData: Function
	isFocus?: boolean
}

const EDITTOR_HOLDER_ID = 'editorjs'

const Editor = ({ data, setData, isFocus }: IProps) => {
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
				header: Header
			},
			placeholder: 'Tell your story...'
		})
	}

	return (
		<>
			<div id={EDITTOR_HOLDER_ID}></div>
			<div>{JSON.stringify(data, null, 2)}</div>
		</>
	)
}

export default Editor
