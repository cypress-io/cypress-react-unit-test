// @ts-check
const path = require('path')
const debug = require('debug')('cypress-react-unit-test')
const webpack = require('@cypress/webpack-preprocessor')
const findWebpack = require('find-webpack')

module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)

  const webpackFilename = config.env && config.env.webpackFilename
  if (!webpackFilename) {
    throw new Error(
      'Could not find "webpackFilename" option in Cypress env variables %o',
      config.env,
    )
  }
  debug('got webpack config filename %s', webpackFilename)
  const resolved = path.resolve(webpackFilename)
  debug('resolved webpack at %s', webpackFilename)
  const webpackOptions = require(resolved)

  debug('webpack options: %o', webpackOptions)

  const coverageIsDisabled =
    config && config.env && config.env.coverage === false
  debug('coverage is disabled? %o', { coverageIsDisabled })

  const opts = {
    coverage: !coverageIsDisabled,
  }

  findWebpack.cleanForCypress(opts, webpackOptions)
  debug('claned webpack options: %o', webpackOptions)

  const options = {
    webpackOptions,
    watchOptions: {},
  }

  on('file:preprocessor', webpack(options))

  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config
}
