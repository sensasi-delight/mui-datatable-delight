import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'
import nodeResolve from '@rollup/plugin-node-resolve'
import preserveDirectives from 'rollup-preserve-directives'
import terser from '@rollup/plugin-terser'
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

    /** To minify the bundled files */
    terser({
        format: {
            comments: false
        },
        compress: {
            drop_console: true,
            drop_debugger: true
        }
    }),

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
            declarationMap: false,
            verbatimModuleSyntax: false
        }
    })
]

/** @type {import('rollup').RollupOptions[]} */
export default [
    {
        /**
         * @todo REMOVE THIS TO DECREASE BUNDLE SIZE
         * @todo ALSO DO NOT FORGET TO REMOVE `redux` THAT ONLY REQUIRED BY `react-dnd`
         * @todo ALSO DO NOT FORGET TO REMOVE `src/` IN `main` AND `module` IN PACKAGE JSON
         */
        external: id => {
            if (id.includes('dnd-core') || id.includes('react-dnd')) {
                return false
            }

            return id.includes('/node_modules/')
        },
        input: 'src/index.ts',
        output: [
            {
                dir: 'dist/cjs',
                format: 'cjs',
                exports: 'named',
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
            file: 'dist/types/index.d.ts',
            format: 'es'
        },
        plugins: [
            dts({
                tsconfig: './tsconfig.json',
                compilerOptions: {
                    noCheck: true // REMOVE THIS WHEN THIS PROJECT IS FULLY TYPE SAFE
                }
            })
        ]
    }
]
