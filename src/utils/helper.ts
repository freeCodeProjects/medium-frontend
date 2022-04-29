export const trimString = (u: unknown) => (typeof u === 'string' ? u.trim() : u)

export const isFileImage = (file: File | Blob) => {
	return file && file['type'].split('/')[0] === 'image'
}

export const validateFileSize = (file: File | Blob, sizeInMB: number) => {
	let size = file.size / (1024 * 1024)
	return size < sizeInMB
}

export const randomString = (length: number) => {
	var chars =
		'0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('')

	if (!length) {
		length = Math.floor(Math.random() * chars.length)
	}

	var str = ''
	for (var i = 0; i < length; i++) {
		str += chars[Math.floor(Math.random() * chars.length)]
	}
	return str
}
