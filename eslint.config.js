import { fixupPluginRules } from '@eslint/compat'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

/**  @type {import('eslint').Linter.FlatConfig}*/
export default [
	{
		plugins: {
			react: reactPlugin,
			'react-hooks': fixupPluginRules(reactHooksPlugin),
		},
		rules: {
			...reactHooksPlugin.configs.recommended.rules,
		},
	},
]
