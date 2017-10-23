import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

export default {
  strict: true,
  input: 'index.js',
  output: Object.assign((() => {
    switch (process.env.OUTPUT) {
      case 'esm': return { format: 'es', file: 'dist/index.esm.js' }
      default: return { format: 'cjs', file: 'dist/index.js' }
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
        comments: false,
        ascii_only: true
      }
    }, minify)
  ]
}
