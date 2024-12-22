import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'

import pkg from './package.json'

const PLUGINS = [
  replace({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  commonjs({
    include: ['node_modules/**']
  }),
  babel({
    babelHelpers: 'runtime',
    babelrc: true
  }),
  terser(),
  filesize()
]

export default {
  input: 'src/index.js',
  plugins: PLUGINS,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ]
}
