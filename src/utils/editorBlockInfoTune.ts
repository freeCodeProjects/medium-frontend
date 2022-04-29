export default class EditorBlockInfoTune {
	api: any = undefined

	static get isTune() {
		return true
	}

	constructor({ api }: { api: any }) {
		this.api = api
	}

	render() {
		const element = document.createElement('div')

		element.style.color = '#000000'
		element.style.padding = '4px'
		element.style.border = '2px solid rgba(175, 184, 193, 0.2)'
		element.style.borderRadius = '4px'

		element.innerHTML = `<svg height="24px" xmlns="http://www.w3.org/2000/svg" fill="defaultColor" viewBox="0 0 24 24" stroke="lightgray" stroke-width="2">
    <path fill="#fff" stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg> Use <code>Tab</code> to create or <code>Shift+Tab</code> keys  to remove sublist with a padding.`

		return element
	}
}
