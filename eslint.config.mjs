import eslintPluginFilenames from 'eslint-plugin-filenames'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config({
    extends: [
        js.configs.recommended,
        ...tseslint.configs.strict,
        ...tseslint.configs.stylisticTypeChecked,
        prettierConfig
    ],
    languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
        parserOptions: {
            project: 'tsconfig.json'
        }
    },
    plugins: {
        filenames: eslintPluginFilenames,
        import: eslintPluginImport,
        'jsx-a11y': eslintPluginJsxA11y,
        react: eslintPluginReact,
        'react-hooks': eslintPluginReactHooks,
        'react-refresh': reactRefresh
    },
    rules: {
        ...eslintPluginReactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true }
        ],
        'no-console': 'off',
        semi: ['error', 'never'],
        'no-undef': 'error',
        'no-undef-init': 'error',
        'no-tabs': 'error',
        'react/self-closing-comp': 'error',
        'react/no-typos': 'error',
        'react/jsx-no-duplicate-props': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'jsx-a11y/no-autofocus': [
            2,
            {
                ignoreNonDOM: true
            }
        ]
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
})
