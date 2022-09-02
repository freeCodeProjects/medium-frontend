export type Comment = {
	_id: string
	userId: string
	postId: string
	claps: number
	relatedTo: 'blog' | 'comment'
}

export type AddCommentInput = {
	postId: string
	comment: string
	relatedTo: 'comment' | 'blog'
}
