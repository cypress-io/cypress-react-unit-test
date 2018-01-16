const webpack = require('@cypress/webpack-preprocessor')
const path = require('path')
const APP_DIR = path.resolve(__dirname, '..', '..', 'src')
const webpackOptions = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties']
        }
      },
      // how to run babel-loader then instrumenter? With right source map?
      {
        test: /\.(js|jsx|mjs)$/,
        include: APP_DIR,
        exclude: /transpiled\.jsx/,
        loader: 'babel-6-istanbul-instrumenter-loader'
      }
    ]
  }
}

const options = {
  // send in the options from your webpack.config.js, so it works the same
  // as your app's code
  webpackOptions,
  watchOptions: {}
}

module.exports = on => {
  on('file:preprocessor', webpack(options))
}
