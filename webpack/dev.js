const webpack = require('webpack')
const { readFileSync } = require('fs')
const { join } = require('path')

module.exports = {
  devtool: 'cheap-module-inline-source-map',
  entry: {
    app: [join(__dirname, 'dev/index.js')]
  },
  output: {
    path: join(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: JSON.parse(readFileSync('.babelrc'))
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ]
}
