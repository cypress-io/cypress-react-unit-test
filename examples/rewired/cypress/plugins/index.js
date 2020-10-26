// load file preprocessor that comes with this plugin
// https://github.com/bahmutov/cypress-react-unit-test#install
const debug = require('debug')('overrides')
const fw = require('find-webpack')

const env = (process.env.NODE_ENV = process.env.NODE_ENV || 'development')

const webpackPreprocessor = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  // require('@cypress/code-coverage/task')(on, config)

  const foundWebpackOptions = fw.getWebpackOptions()
  const configOverrides = require('react-app-rewired/config-overrides')
  const webpackOptions = configOverrides.webpack(foundWebpackOptions, env)

  debug('webpackOptions %o', webpackOptions)
  fw.cleanForCypress(
    {
      reactScripts: true,
      looseModules: true,
    },
    webpackOptions,
  )

  on('file:preprocessor', webpackPreprocessor({ webpackOptions }))

  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config
}
