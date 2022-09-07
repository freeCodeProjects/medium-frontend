export type Notification = {
	_id: string
	userId: string
	ownerId: string
	message: string
	action: 'follow' | 'comment' | 'clap'
	createdAt: string
	updatedAt: string
}
