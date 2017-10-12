import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'

export default {
  strict: true,
  input: 'index.js',
  output: {
    format: 'cjs',
    file: 'dist/index.js',
    name: 'moer',
    sourcemap: true
  },
  plugins: [
    cjs(),
    nodeResolve({ main: true, jsnext: true }),
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
    }),
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
