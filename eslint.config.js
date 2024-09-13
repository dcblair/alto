import { default as defaultConfig } from '@epic-web/config/eslint'
import { fixupPluginRules } from '@eslint/compat'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

/** @type {import("eslint").Linter.Config} */
export default [
	...defaultConfig,
	{
		plugins: { 'react-hooks': fixupPluginRules(reactHooksPlugin) },
	},
	// add custom config objects here:
]
