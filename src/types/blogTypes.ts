export interface Blog {
	_id: string
	title: string
	slug: string
	publishedTitle: string
	subTitle: string
	content: object
	publishedContent: object
	status: 'draft' | 'published'
	tags: string[]
	userId: string
	previewImage: string
	clapsCount: number
	responsesCount: number
	publishedAt: Date
	readTime: number
}

export type BlogEditorData = {
	title: string
	content: EditorData
}

export type EditorData = {
	time: string
	blocks: Array<any>
	version: string[]
}

export type PublishBlogData = {
	title?: string
	content: EditorData | null
	subTitle?: string
	tags?: string[]
	previewImage?: string
}
