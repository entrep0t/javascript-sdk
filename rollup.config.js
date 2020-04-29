import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';

const isForIE = process.env.BABEL_ENV === 'ie';
const input = './lib/index.js';
const output = `./dist${isForIE ? '/ie' : ''}/entrepot`;

const defaultPlugins = [
  eslint(),
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'runtime',
  }),
  resolve(),
  commonjs(),
];

const defaultExternals = [
  'isomorphic-fetch',
];

const defaultGlobals = {
  'isomorphic-fetch': 'fetch',
};

export default [
  // umd
  {
    input,
    plugins: [
      ...defaultPlugins,
      terser(),
    ],
    external: defaultExternals,
    output: {
      file: `${output}.min.js`,
      format: 'umd',
      name: 'Entrepot',
      sourcemap: true,
      globals: defaultGlobals,
    },
  },

  // cjs
  {
    input,
    plugins: [
      ...defaultPlugins,
      terser(),
    ],
    external: defaultExternals,
    output: {
      file: `${output}.cjs.js`,
      format: 'cjs',
      sourcemap: true,
    },
  },

  // esm
  {
    input,
    plugins: [
      ...defaultPlugins,
    ],
    external: defaultExternals,
    output: {
      file: `${output}.esm.js`,
      format: 'esm',
      sourcemap: true,
    },
  },
];
