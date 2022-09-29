export type Blog = {
	_id: string
	title: string
	slug: string
	publishedTitle: string
	subTitle: string
	content: EditorData
	publishedContent: EditorData
	status: 'draft' | 'published'
	tags: string[]
	userId: string
	previewImage: string
	clapsCount: number
	responsesCount: number
	createdAt: string
	updatedAt: string
	publishedAt: string
	readTime: number
	isPublished: boolean
}

export type BlogEditorData = {
	title: string
	content: EditorData
}

export type EditorData = {
	time: number
	blocks: Array<any>
	version: string
}

export type PublishBlogData = {
	title?: string
	content: EditorData | null
	subTitle?: string
	tags?: string[]
	previewImage?: string
}

export type BlogPreview = Omit<
	Blog,
	'title' | 'content' | 'createdAt' | 'updatedAt'
>

export type BlogAutoComplete = {
	_id: string
	publishedTitle: string
	slug: string
}
