import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default defineConfig([
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        plugins: { js },
        rules: {
            eqeqeq: 'error',
            'no-console': 'warn',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-explicit-any': 'warn'
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    },
    eslintConfigPrettier
])
