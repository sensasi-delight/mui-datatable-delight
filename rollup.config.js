import commonjs from '@rollup/plugin-commonjs'
import del from 'rollup-plugin-delete'
import nodeResolve from '@rollup/plugin-node-resolve'
import preserveDirectives from 'rollup-preserve-directives'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

/** @type {import('rollup').RollupOptions['plugins']} */
const PLUGINS = [
    /** Locate modules using the Node resolution algorithm, for using third party modules in node_modules */
    nodeResolve(),

    /** Convert CommonJS modules to ES6, so they can be included in a Rollup bundle */
    commonjs(),

    /** To minify the bundled files */
    terser(),

    /** To preserve `use client` directive */
    preserveDirectives()
]

/** @type {import('rollup').RollupOptions} */
const BASE_EXPORT = {
    external: [/node_modules/],
    input: 'src/index.ts'
}

/** @type {import('rollup').RollupOptions} */
const CJS_EXPORT = {
    ...BASE_EXPORT,
    plugins: [
        ...PLUGINS,
        /** To delete `dist` dir before build */
        del({ targets: 'dist/*' }),

        typescript({
            tsconfig: './tsconfig.json',
            rootDir: './src',

            compilerOptions: {
                allowImportingTsExtensions: false
            }
        })
    ],
    output: {
        preserveModules: true,
        dir: 'dist/cjs',
        format: 'cjs',
        sourcemap: true,
        exports: 'named'
    }
}

/** @type {import('rollup').RollupOptions} */
const MJS_EXPORT = {
    ...BASE_EXPORT,
    plugins: [
        ...PLUGINS,
        typescript({
            tsconfig: './tsconfig.json',
            rootDir: './src',

            compilerOptions: {
                allowImportingTsExtensions: false,
                declaration: true,
                declarationDir: 'dist/esm',
                emitDeclarationOnly: true
            }
        })
    ],
    output: {
        preserveModules: true,
        dir: 'dist/esm',
        format: 'es',
        sourcemap: true
    }
}

/** @type {import('rollup').RollupOptions} */
export default [CJS_EXPORT, MJS_EXPORT]
