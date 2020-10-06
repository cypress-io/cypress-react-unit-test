//const webpack = require('@cypress/webpack-preprocessor')
// Make sure this is first
//import "./register-tsconfig-paths"

const tsConfig = require('../../tsconfig.paths.json')

const baseUrl = './'

module.exports = (on, config) => {
  // atempt to make work absolute paths with cypress component testing
  // did not work yet!!!
  require('./register-tsconfig-paths')

  // require('@cypress/code-coverage/task')(on, config);
  require('cypress-react-unit-test/plugins/react-scripts')(on, config)
  //const options = {
  // send in the options from your webpack.config.js, so it works the same
  // as your app's code
  // webpackOptions: require('../../../webpack.config'),
  //    watchOptions: {},
  // }
  // on('file:preprocessor', webpack(options))
  return config
}
