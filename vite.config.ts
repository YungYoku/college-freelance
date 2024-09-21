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
			preprocessorOptions: {
				scss: {
					api: 'modern'
				},
			},
		},

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
