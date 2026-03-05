import stylisticJs from '@stylistic/eslint-plugin'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs(
	js.configs.recommended,
	pluginVue.configs['flat/recommended'],
	vueTsConfigs.strictTypeChecked,
	vueTsConfigs.stylisticTypeChecked,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},

		plugins: {
			'@stylistic': stylisticJs,
		},

		rules: {
			'vue/multi-word-component-names': 'off',
			'vue/no-reserved-component-names': 'off',
			'vue/no-v-html': 'off',
			'vue/html-indent': ['warn', 'tab'],

			'vue/html-closing-bracket-spacing': ['error', {
				startTag: 'never',
				endTag: 'never',
				selfClosingTag: 'never',
			}],

			'no-console': ['warn', {
				allow: ['warn', 'error'],
			}],

			'no-debugger': 'off',

			'@stylistic/indent': ['warn', 'tab'],
			'@stylistic/semi': ['warn', 'never'],
			'@stylistic/quotes': ['warn', 'single'],
			'@stylistic/no-multi-spaces': ['warn'],
			'@stylistic/object-curly-spacing': ['warn', 'always'],

			'@stylistic/keyword-spacing': ['warn', {
				after: true,
				before: true,
			}],

			'@stylistic/comma-spacing': ['warn', {
				after: true,
				before: false,
			}],

			'@stylistic/key-spacing': ['warn', {
				beforeColon: false,
				afterColon: true,
			}],

			'@stylistic/arrow-spacing': ['warn', {
				before: true,
				after: true,
			}],

			'@stylistic/space-infix-ops': ['warn', {
				int32Hint: false,
			}],
		},
	},
	{
		ignores: [
			'.github/',
			'deploy/',
			'dist/',
			'node_modules/',
			'public/',
			'db/'
		],
	}
)
