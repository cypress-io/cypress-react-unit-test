const debug = require('debug')('cypress-react-unit-test')
const path = require('path')
const findYarnWorkspaceRoot = require('find-yarn-workspace-root')
const webpack = require('@cypress/webpack-preprocessor')

const webpackConfigPath = path.resolve(
  findYarnWorkspaceRoot() || process.cwd(),
  'node_modules',
  'react-scripts',
  'config',
  'webpack.config.js'
)

debug('path to react-scripts own webpack.config.js: %s', webpackConfigPath)

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const webpackFactory = require(webpackConfigPath)
const webpackOptions = webpackFactory('development')
debug('webpack options: %o', webpackOptions)

// remove bunch of options, we just need to bundle spec files
delete webpackOptions.optimization
delete webpackOptions.plugins

// ESLint loader does not know about our "cy" global so it will error
// find it in the module processing rules and add global "cy" option
debug('module property %o', webpackOptions.module)

if (webpackOptions.module && Array.isArray(webpackOptions.module.rules)) {
  const modulePre = webpackOptions.module.rules.find(rule => rule.enforce === 'pre')
  if (modulePre && Array.isArray(modulePre.use)) {
    debug('found Pre block %o', modulePre)

    const useEslintLoader = modulePre.use.find(use => use.loader && use.loader.includes('eslint-loader'))
    if (useEslintLoader) {
      debug('found useEslintLoader %o', useEslintLoader)

      if (useEslintLoader.options) {
        if (Array.isArray(useEslintLoader.options.globals)) {
          debug('adding cy to existing globals %o', useEslintLoader.options.globals)
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


const options = {
  webpackOptions,
  watchOptions: {},
}

module.exports = () => {
  return webpack(options)
}
