import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'

export default {
  strict: true,
  input: 'dev/index.js',
  output: {
    format: 'iife',
    file: 'dev/index.dev.js',
    name: 'moer',
    sourcemap: true
  },
  plugins: [
    cjs(),
    nodeResolve({ main: true, jsnext: true }),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      plugins: [
        require('babel-plugin-external-helpers')
      ],
      presets: [
        [require('babel-preset-moer'), { modules: false, debug: true, targets: { chrome: 61 } }]
      ]
    })
  ]
}
