const debug = require('debug')('cypress-react-unit-test')
const findWebpack = require('find-webpack')
const webpack = require('@cypress/webpack-preprocessor')

const getWebpackOptions = opts => {
  debug('top level opts %o', opts)

  const webpackOptions = findWebpack.getWebpackOptions()
  if (!webpackOptions) {
    console.error('⚠️ Could not find Webpack options, using defaults')
    return {
      webpackOptions: webpack.defaultOptions,
      watchOptions: {},
    }
  }
  debug('webpack options: %o', webpackOptions)
  findWebpack.cleanForCypress(opts, webpackOptions)
  debug('claned webpack options: %o', webpackOptions)

  const options = {
    webpackOptions,
    watchOptions: {},
  }

  return options
}

module.exports = config => {
  debug('env object %o', config.env)

  const coverageIsDisabled =
    config && config.env && config.env.coverage === false
  debug('coverage is disabled? %o', { coverageIsDisabled })

  const opts = {
    coverage: !coverageIsDisabled,
  }
  const options = getWebpackOptions(opts)
  return webpack(options)
}
