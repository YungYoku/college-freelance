import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-expect-error
import eslint from 'vite-plugin-eslint'

export default defineConfig(({ mode }) => {
	const isProd = mode === 'production'

	return {
		esbuild: {
			drop: isProd ? ['console', 'debugger']: []
		},

		plugins: [
			vue(),
			eslint()
		],

		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
		}
	}
})
