const path = require('path')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const { override, addWebpackPlugin, addWebpackAlias } = require('customize-cra')

module.exports = override(
  // enable legacy decorators babel plugin
  // addDecoratorsLegacy(),

  // disable eslint in webpack
  // disableEsLint(),
  addWebpackPlugin(new CaseSensitivePathsPlugin()),
  addWebpackAlias({
    ['@absolutePath']: path.resolve(__dirname, 'src/some/other/place'),
  }),
)
