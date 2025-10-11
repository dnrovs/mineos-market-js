import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

import { dts } from 'rollup-plugin-dts'

const input = 'src/index.ts'
const external = ['lua-json', 'zod', 'camelcase-keys']
const plugins = [typescript(), commonjs(), resolve()]

export default [
    {
        input: input,
        output: [
            {
                file: 'dist/index.cjs',
                format: 'cjs',
                sourcemap: true,
                interop: 'auto'
            }
        ],
        external: external,
        plugins: plugins
    },
    {
        input: input,
        output: [{ file: 'dist/index.js', format: 'es', sourcemap: true }],
        external: external,
        plugins: plugins
    },
    {
        input: input,
        output: [
            {
                file: 'dist/index.umd.min.js',
                format: 'umd',
                name: 'MineOSMarket',
                sourcemap: true
            }
        ],
        plugins: [...plugins, terser()]
    },
    {
        input: input,
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
        plugins: [dts()]
    }
]
