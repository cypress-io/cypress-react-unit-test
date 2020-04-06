const debug = require('debug')('cypress-react-unit-test')
const findWebpack = require('find-webpack')
const webpack = require('@cypress/webpack-preprocessor')

// note: modifies the argument object in place
const addCypressToEslintRules = webpackOptions => {
  if (webpackOptions.module && Array.isArray(webpackOptions.module.rules)) {
    const modulePre = webpackOptions.module.rules.find(
      rule => rule.enforce === 'pre',
    )
    if (modulePre && Array.isArray(modulePre.use)) {
      debug('found Pre block %o', modulePre)

      const useEslintLoader = modulePre.use.find(
        use => use.loader && use.loader.includes('eslint-loader'),
      )
      if (useEslintLoader) {
        debug('found useEslintLoader %o', useEslintLoader)

        if (useEslintLoader.options) {
          if (Array.isArray(useEslintLoader.options.globals)) {
            debug(
              'adding cy to existing globals %o',
              useEslintLoader.options.globals,
            )
            useEslintLoader.options.globals.push('cy')
            useEslintLoader.options.globals.push('Cypress')
          } else {
            debug('setting new list of globals with cy and Cypress')
            useEslintLoader.options.globals = ['cy', 'Cypress']
          }
        }
      }
    }
  }
}

// note: modifies the argument object in place
const addCodeCoverage = webpackOptions => {
  debug('trying to add code instrumentation plugin')
  if (!webpackOptions) {
    return
  }
  if (!webpackOptions.module) {
    return
  }
  debug('webpackOptions.module %o', webpackOptions.module)
  if (!Array.isArray(webpackOptions.module.rules)) {
    return
  }
  const oneOfRule = webpackOptions.module.rules.find(rule =>
    Array.isArray(rule.oneOf),
  )
  if (!oneOfRule) {
    return
  }
  const babelRule = oneOfRule.oneOf.find(
    rule => rule.loader && rule.loader.includes('/babel-loader/'),
  )
  if (!babelRule) {
    return
  }
  debug('babel rule %o', babelRule)
  if (!babelRule.options) {
    return
  }
  if (!Array.isArray(babelRule.options.plugins)) {
    return
  }
  babelRule.options.plugins.push('babel-plugin-istanbul')
  debug('added babel-plugin-istanbul')
}

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

  // remove bunch of options, we just need to bundle spec files
  delete webpackOptions.optimization
  delete webpackOptions.plugins

  // ESLint loader does not know about our "cy" global so it will error
  // find it in the module processing rules and add global "cy" option
  debug('module property %o', webpackOptions.module)

  addCypressToEslintRules(webpackOptions)
  if (opts.coverage) {
    addCodeCoverage(webpackOptions)
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
    coverage: !coverageIsDisabled,
  }
  const options = getWebpackOptions(opts)
  return webpack(options)
}
