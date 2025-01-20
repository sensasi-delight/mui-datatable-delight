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

/** @type {import('@rollup/plugin-typescript').RollupTypescriptOptions} */
const TS_OPTS_FOR_ESM_BUILD = {
    tsconfig: './tsconfig.json',
    rootDir: './src',

    compilerOptions: {
        allowImportingTsExtensions: false
    }
}

/** @type {import('@rollup/plugin-typescript').RollupTypescriptOptions} */
const TS_OPTS_FOR_CJS_BUILD = {
    ...TS_OPTS_FOR_ESM_BUILD,

    compilerOptions: {
        allowImportingTsExtensions: false,
        declaration: true,
        declarationDir: 'dist/cjs',
        emitDeclarationOnly: true
    }
}

/** @type {import('rollup').RollupOptions} */
const ROLLUP_BASE_OPTS = {
    external: id => {
        if (id.includes('dnd-core') || id.includes('react-dnd')) {
            return false
        }

        return /node_modules/.test(id)
    },
    input: 'src/index.ts'
}

/** @type {import('rollup').RollupOptions[]} */
export default [
    {
        ...ROLLUP_BASE_OPTS,
        output: {
            dir: 'dist/cjs',
            exports: 'named',
            format: 'cjs',
            preserveModules: true,
            sourcemap: true
        },
        plugins: [
            /** To delete `dist` dir before build */
            del({ targets: 'dist/*' }),

            ...PLUGINS,

            typescript(TS_OPTS_FOR_CJS_BUILD)
        ]
    },
    {
        ...ROLLUP_BASE_OPTS,
        output: {
            dir: 'dist/esm',
            format: 'es',
            preserveModules: true,
            sourcemap: true
        },
        plugins: [...PLUGINS, typescript(TS_OPTS_FOR_ESM_BUILD)]
    }
]
