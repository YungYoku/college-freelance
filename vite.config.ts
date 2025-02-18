import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslint from 'vite-plugin-eslint'

export default defineConfig(({ mode }) => {
	const esbuild = { drop: [] }
	if (mode === 'production') {
		esbuild.drop = ['console', 'debugger']
	}

	return {
		esbuild,

		plugins: [
			vue(),
			eslint()
		],

		server: {
			port: 5173,
			strictPort: true
		},

		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			}
		}
	}
})
