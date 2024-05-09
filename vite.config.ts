import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslint from 'vite-plugin-eslint'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
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
	},

	esbuild: {
		drop: ['console', 'debugger']
	},
})
