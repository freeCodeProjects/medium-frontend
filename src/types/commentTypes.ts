export type Comment = {
	_id: string
	userId: string
	postId: string
	claps: number
	comment: string
	relatedTo: 'blog' | 'comment'
	createdAt: string
	updatedAt: string
}

export type AddCommentInput = {
	postId: string
	comment: string
	relatedTo: 'comment' | 'blog'
}
