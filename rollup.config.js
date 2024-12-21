import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
// locals
import pkg from './package.json';

/**
 * Rollup plugins
 *
 * @type {import('rollup').Plugin[]}
 */
const PLUGINS = [
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
    preventAssignment: false,
  }),
  commonjs({
    include: ['node_modules/**'],
  }),
  babel({
    babelHelpers: 'runtime',
    babelrc: true,
  }),
  terser(),
  filesize(),
];

/**
 * Rollup configuration
 *
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: 'src/index.js',
  plugins: PLUGINS,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
};
