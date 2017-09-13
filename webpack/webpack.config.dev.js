const webpack = require('webpack')
const { readFileSync, existsSync } = require('fs')
const { join } = require('path')

const options = JSON.parse(readFileSync('.babelrc'))
const moer = join(__dirname, '../../babel-plugin-moer/index.js')
options.plugins.unshift(existsSync(moer) ? moer : 'moer')

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
  resolve: {
    alias: {
      moer: join(__dirname, '..')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options
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
