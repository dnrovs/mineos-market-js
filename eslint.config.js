import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import prettierPlugin from 'eslint-plugin-prettier'

export default defineConfig([
    ...tseslint.configs.recommended,
    {
        files: ['src/**/*.{ts,cts,mts}'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json'
            },
            globals: {
                ...globals.node,
                ...globals.browser
            }
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            prettier: prettierPlugin
        },
        rules: {
            eqeqeq: 'error',
            'no-console': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-empty-object-type': 'off',
        }
    },
    eslintConfigPrettier
])
