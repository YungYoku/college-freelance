import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslint from 'vite-plugin-eslint'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig(({ mode }) => {
	const esbuild = { drop: [] }
	if (mode === 'production') {
		esbuild.drop = ['console', 'debugger']
	}

	return {
		esbuild,

		css: {
			postcss: {
				plugins: [tailwind(), autoprefixer()],
			},
		},

		plugins: [
			vue(),
			eslint()
		],

		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			}
		}
	}
})
