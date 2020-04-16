// @ts-check
const debug = require('debug')('cypress-react-unit-test')
const findWebpack = require('find-webpack')
const webpackPreprocessor = require('@cypress/webpack-preprocessor')

const getWebpackOptions = opts => {
  debug('top level opts %o', opts)

  const webpackOptions = findWebpack.getWebpackOptions()
  if (!webpackOptions) {
    console.error('⚠️ Could not find Webpack options, using defaults')
    return {
      webpackOptions: webpackPreprocessor.defaultOptions,
      watchOptions: {},
    }
  }
  debug('webpack options: %o', webpackOptions)
  findWebpack.cleanForCypress(opts, webpackOptions)
  debug('claned webpack options: %o', webpackOptions)

  // we need to handle static images and redirect them to
  // the existing files. Cypress has fallthrough static server
  // for anything like "/_root/<path>" which is perfect - because
  // importing a static image gives us that <path>!
  // insert our loader first before any built-in loaders kick in
  const loaderRules = webpackOptions.module.rules.find(rule =>
    Array.isArray(rule.oneOf),
  )
  if (loaderRules) {
    debug('found oneOf rule %o', loaderRules.oneOf)
    debug('adding our static image loader')
    loaderRules.oneOf.unshift({
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
      loader: require.resolve('./redirect-resource'),
    })
  }

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
    reactScripts: true,
    coverage: !coverageIsDisabled,
  }
  const options = getWebpackOptions(opts)
  return webpackPreprocessor(options)
}
