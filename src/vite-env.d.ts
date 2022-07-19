/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_BACKEND_URL: string
	readonly VITE_SITE_URL: string
	readonly VITE_UNSPLASH_SECRET: string
	readonly VITE_NUMBER_OF_DOCUMENT_PER_REQUEST: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
