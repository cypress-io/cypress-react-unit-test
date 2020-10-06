const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  // add alias to load "@components" from another folder
  // so that tests in cypress/component can load components using
  // import X from '@components/X'
  // see https://glebbahmutov.com/blog/using-ts-aliases-in-cypress-tests/
  resolve: {
    extensions: ['.js'],
    alias: {
      '@components': path.resolve(__dirname, 'more-components', 'src'),
    },
  },
}
