const webpack = require('webpack')
const path = require('path')

const filename =
  '/Users/gleb/git/cypress-react-unit-test/cypress/component/basic/counter-set-state/counter-spec.js'

const babelConfig = require('./babel.config.js')

// should we just reuse root webpack config?
const webpackOptions = {
  entry: {
    'counter-spec': filename,
  },
  output: {
    path: path.resolve('./out-test'),
    filename: '[name].bundle.js',
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
    },
  },
  mode: 'development',
  stats: 'verbose',
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs|ts|tsx)$/,
        loader: 'babel-loader',
        options: babelConfig,
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: ['style-loader', 'css-loader'],
      },
      {
        // some of our examples import SVG
        test: /\.svg$/,
        loader: 'svg-url-loader',
      },
    ],
  },
  // will put node_modules code into separate "vendor" bundle
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}

const compiler = webpack(webpackOptions)
// if you want to watch files for changes
const watching = compiler.watch(
  {
    // Example watchOptions
    aggregateTimeout: 300,
    poll: undefined,
  },
  (err, stats) => {
    console.log('*******')
    console.log(new Date())
    console.log('*******')
    if (err) {
      console.error(err)
    } else {
      console.log(stats.toJson('verbose'))
    }
  },
)

// if you want to build it once
// compiler.run((err, stats) => {
//   if (err) {
//     console.error(err)
//   } else {
//     console.log(stats.toJson('verbose'))
//   }
// })
