export type Clap = {
	_id: string
	userId: string
	postId: string
	claps: number
	relatedTo: 'blog' | 'comment'
}
