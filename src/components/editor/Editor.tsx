//@ts-nocheck
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import Undo from 'editorjs-undo'
import { useEffect, useRef, useState } from 'react'

const DEFAULT_INITIAL_DATA = () => {
	return {
		time: new Date().getTime(),
		blocks: [
			{
				type: 'paragraph'
			}
		]
	}
}

type IProps = {
	data: object
}

const EDITTOR_HOLDER_ID = 'editorjs'

const Editor = ({ data }: IProps) => {
	const ejInstance = useRef()
	const [editorData, setEditorData] = useState(data)

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
			data: editorData,
			onReady: () => {
				ejInstance.current = editor
				new Undo({ editor })
			},
			onChange: async (api) => {
				let content = await api.saver.save()
				// Put your logic here to save this data to your DB

				if (content) {
					setEditorData(content)
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
			<div>{JSON.stringify(editorData, null, 2)}</div>
		</>
	)
}

export default Editor
