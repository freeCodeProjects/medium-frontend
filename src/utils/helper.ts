export const trimString = (u: unknown) => (typeof u === 'string' ? u.trim() : u)

export const isFileImage = (file: File) => {
	return file && file['type'].split('/')[0] === 'image'
}

export const validateFileSize = (file: File, sizeInMB: number) => {
	let size = file.size / (sizeInMB * 1024 * 1024)
	return size < sizeInMB
}
