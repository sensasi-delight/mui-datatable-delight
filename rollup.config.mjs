import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'
import nodeResolve from '@rollup/plugin-node-resolve'
import preserveDirectives from 'rollup-preserve-directives'
import typescript from '@rollup/plugin-typescript'

/** @type {import('rollup').RollupOptions['plugins']} */
const PLUGINS = [
    /** To delete `dist` dir before build */
    del({ targets: 'dist/*' }),

    /** Locate modules using the Node resolution algorithm, for using third party modules in node_modules */
    nodeResolve({
        browser: true,
        preferBuiltins: false
    }),

    /** Convert CommonJS modules to ES6, so they can be included in a Rollup bundle */
    commonjs(),

    /** To preserve `use client` directive */
    preserveDirectives(),

    /** Transpile the code using Babel */
    babel({
        babelHelpers: 'bundled',
        exclude: /node_modules/,
        presets: ['@babel/preset-react', '@babel/preset-typescript']
    }),

    /** To build from tsx files */
    typescript({
        tsconfig: './tsconfig.json',
        outputToFilesystem: true,

        compilerOptions: {
            composite: false,
            declarationMap: false
        }
    })
]

/** @type {import('rollup').RollupOptions[]} */
export default [
    {
        external: /node_modules/,
        input: 'src/index.ts',

        /**
         * Why support multiple formats?
         *
         * @see https://github.com/sensasi-delight/mui-datatable-delight/issues/106
         */
        output: [
            {
                dir: 'dist/cjs',
                format: 'cjs',
                exports: 'named',
                interop: 'auto',
                preserveModules: true,
                sourcemap: true
            },
            {
                dir: 'dist/esm',
                format: 'es',
                preserveModules: true,
                sourcemap: true
            }
        ],
        plugins: PLUGINS
    },
    {
        // Bundling Type Definitions
        input: 'src/index.ts',
        output: {
            file: 'dist/types.d.ts',
            format: 'es'
        },
        plugins: [
            dts({
                tsconfig: './tsconfig.json'
            })
        ]
    }
]
