import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

export default {
  strict: true,
  input: 'index.js',
  output: {
    format: 'es',
    file: 'dist/index.js',
    name: 'moer'
  },
  plugins: [
    cjs(),
    nodeResolve({ main: true, jsnext: true }),
    uglify({
      ecma: 6,
      compress: {
        warnings: false
      },
      output: {
        comments: false,
        ascii_only: true
      }
    }, minify),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      plugins: [
        require('babel-plugin-external-helpers')
      ],
      presets: [
        [require('babel-preset-moer'), { modules: false }]
      ]
    })
  ]
}
