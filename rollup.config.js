import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

import pkg from './package.json' assert { type: 'json' }

/** @type {import('rollup').RollupOptions['plugins']} */
const PLUGINS = [
    /** Locate modules using the Node resolution algorithm, for using third party modules in node_modules */
    nodeResolve(),

    /** Convert CommonJS modules to ES6, so they can be included in a Rollup bundle */
    commonjs({
        include: ['node_modules/**']
    }),

    /** To wide-support browser */
    babel({
        babelHelpers: 'runtime',
        babelrc: true
    }),

    /** To minify the bundled files */
    terser(),

    /** To show the bundled size */
    filesize(),

    /** To bundling ts/tsx files */
    typescript({
        importHelpers: true,
        tsconfig: './tsconfig.json',
        rootDir: './src',

        compilerOptions: {
            declaration: true,
            declarationDir: './dist',
            isolatedDeclarations: true
        }
    })
]

/** @type {import('rollup').RollupOptions} */
export default {
    external: [/node_modules/],
    input: 'src/index.ts',
    plugins: PLUGINS,
    output: [
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true,
            exports: 'named'
        }
    ]
}
