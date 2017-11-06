import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import nodeResolve from 'rollup-plugin-node-resolve'
import { minify } from 'uglify-es'
import { version } from './package.json'

const banner = `/*! Moer.js v${version} | (c) Shirasawa ${new Date().getFullYear()} | ` +
  'Released under the MIT License | git.coding.net/ncbql/moer.git */'
export default {
  banner,
  strict: true,
  input: 'index.js',
  output: Object.assign((() => {
    switch (process.env.OUTPUT) {
      case 'esm': return { format: 'es', file: 'dist/moer.esm.js' }
      default: return { format: 'cjs', file: 'dist/moer.js' }
    }
  })(), { name: 'moer', sourcemap: true }),
  plugins: [
    cjs(),
    nodeResolve({ main: true, jsnext: true }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      plugins: [
        require('babel-plugin-external-helpers')
      ],
      presets: [
        [require('babel-preset-moer'), { modules: false }]
      ]
    }),
    uglify({
      compress: {
        warnings: false,
        collapse_vars: true,
        evaluate: true,
        unsafe: true,
        pure_getters: true,
        unused: true,
        dead_code: true
      },
      output: {
        ascii_only: true,
        comments: (_, { type, value }) =>
          type === 'comment2' && /! Moer\.js v.+? /i.test(value)
      }
    }, minify)
  ]
}
