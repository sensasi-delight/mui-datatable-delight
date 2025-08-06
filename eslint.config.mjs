import eslintPluginFilenames from 'eslint-plugin-filenames'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import js from '@eslint/js'
import pluginNext from '@next/eslint-plugin-next'
import prettierConfig from 'eslint-config-prettier'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import tssUnusedClasses from 'eslint-plugin-tss-unused-classes'

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
        '@next/next': pluginNext,
        filenames: eslintPluginFilenames,
        import: eslintPluginImport,
        'jsx-a11y': eslintPluginJsxA11y,
        react: eslintPluginReact,
        'react-hooks': eslintPluginReactHooks,
        'react-refresh': reactRefresh,
        'tss-unused-classes': tssUnusedClasses
    },
    rules: {
        ...pluginNext.configs.recommended.rules,
        ...pluginNext.configs['core-web-vitals'].rules,
        ...eslintPluginReactHooks.configs.recommended.rules,
        '@next/next/no-html-link-for-pages': ['error', './docs'],
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true }
        ],
        'no-console': 'off',
        semi: ['error', 'never'],
        'no-undef-init': 'error',
        'no-tabs': 'error',
        'react/self-closing-comp': 'error',
        'react/no-typos': 'error',
        'react/jsx-no-duplicate-props': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        '@typescript-eslint/prefer-literal-enum-member': 'off',
        'jsx-a11y/no-autofocus': [
            2,
            {
                ignoreNonDOM: true
            }
        ],
        'tss-unused-classes/unused-classes': 'warn',

        /**
         * @see https://mui.com/material-ui/guides/minimizing-bundle-size/
         */
        'no-restricted-imports': [
            'error',
            {
                patterns: [{ regex: '^@mui/[^/]+$' }]
            }
        ]
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
})
