import commonjs from '@rollup/plugin-commonjs'
import del from 'rollup-plugin-delete'
import nodeResolve from '@rollup/plugin-node-resolve'
import preserveDirectives from 'rollup-preserve-directives'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

/** @type {import('rollup').RollupOptions['plugins']} */
const PLUGINS = [
    /** To delete `dist` dir before build */
    del({ targets: 'dist/*' }),

    /** Locate modules using the Node resolution algorithm, for using third party modules in node_modules */
    nodeResolve(),

    /** Convert CommonJS modules to ES6, so they can be included in a Rollup bundle */
    commonjs(),

    /** To minify the bundled files */
    terser(),

    /** To preserve `use client` directive */
    preserveDirectives(),

    /** Bundle ts files */
    typescript({
        tsconfig: './tsconfig.json',
        rootDir: './src',

        compilerOptions: {
            allowImportingTsExtensions: false,
            declaration: true,
            declarationDir: 'dist'
        }
    })
]

/** @type {import('rollup').RollupOptions} */
export default {
    external: [/node_modules/],
    input: 'src/index.ts',
    output: [
        {
            dir: 'dist',
            format: 'es',
            preserveModules: true,
            sourcemap: true
        }
    ],
    plugins: PLUGINS
}
