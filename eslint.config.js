import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default defineConfig([
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,cts,mts}'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json'
            },
            globals: {
                ...globals.node
            }
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin
        },
        rules: {
            eqeqeq: 'error',
            'no-console': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn'
        }
    },
    eslintConfigPrettier
])
