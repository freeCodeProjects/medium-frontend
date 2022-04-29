/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_BACKEND_URL: string
	readonly VITE_SITE_URL: string
	readonly VITE_UNSPLASH_SECRET: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
