// @ts-check
const path = require('path')
const debug = require('debug')('cypress-react-unit-test')
const loadConfig = require('next/dist/next-server/server/config').default
const getNextJsBaseWebpackConfig = require('next/dist/build/webpack-config')
  .default
const webpackPreprocessor = require('@cypress/webpack-preprocessor')
const findWebpack = require('find-webpack')

async function getNextWebpackConfig(config) {
  const coverageIsDisabled =
    config && config.env && config.env.coverage === false

  debug('coverage is disabled? %o', { coverageIsDisabled })
  debug('Cypress project %o', {
    projectRoot: config.projectRoot,
    componentFolder: config.componentFolder,
  })

  const nextConfig = await loadConfig('development', config.projectRoot)

  const configOptions = {
    buildId: `cypress-react-unit-test-${Math.random().toString()}`,
    config: nextConfig,
    dev: false,
    isServer: false,
    // assuming the Next.js project has the entire pages in "/pages" subfolder
    // https://github.com/bahmutov/cypress-react-unit-test/pull/517
    pagesDir: path.join(config.projectRoot, 'pages'),
    entrypoints: {},
    rewrites: [],
  }
  debug('Next config options %o', configOptions)

  const nextWebpackConfig = await getNextJsBaseWebpackConfig(
    config.projectRoot,
    configOptions,
  )

  debug('resolved next.js webpack options: %o', nextWebpackConfig)
  // Using mode over `dev` true to get rid of next's react-refresh-plugin wrapping
  // We need do not need all the HMR and webpack dev middlewares as well
  nextWebpackConfig.mode = 'development'

  findWebpack.cleanForCypress(
    {
      coverage: !coverageIsDisabled,
      // insert Babel plugin to mock named imports
      // disable because causes an error with double definitions
      // https://github.com/bahmutov/cypress-react-unit-test/issues/439
      looseModules: false,
    },
    nextWebpackConfig,
  )

  debug('final webpack options %o', nextWebpackConfig)
  return nextWebpackConfig
}

let webpackConfigCache = null

/** Resolving next.js webpack and all config with plugin takes long, so cache the webpack configuration */
async function getCachedWebpackPreprocessor(config) {
  // ⛔️ ⛔️ Comment this `if` for debugging
  if (webpackConfigCache !== null) {
    return webpackConfigCache
  }

  const webpackOptions = await getNextWebpackConfig(config)
  webpackConfigCache = webpackPreprocessor({ webpackOptions })

  debug('created and cached webpack preprocessor based on next.config.js')

  return webpackConfigCache
}

module.exports = config => async fileEvent => {
  const preprocessor = await getCachedWebpackPreprocessor(config)

  return preprocessor(fileEvent)
}
