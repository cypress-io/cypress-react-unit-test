# Recipes

- [Do nothing](#do-nothing)
- [React scripts](#react-scripts)
- [Your own Webpack config](#your-webpack-config)

## Do nothing

Cypress Test Runner understands plain JSX by default, so for simple React applications it ... might just test components right out of the box!

## React Scripts

If you are using Create-React-App v3 or `react-scripts`, and want to reuse the built in webpack before ejecting, this module ships with Cypress preprocessor in [plugins](plugins) folder. From the `cypress.json` point at the shipped plugin in the `node_modules`.

```json
{
  "pluginsFile": "node_modules/cypress-react-unit-test/plugins/cra-v3",
  "supportFile": "node_modules/cypress-react-unit-test/support"
}
```

See example repo [bahmutov/try-cra-with-unit-test](https://github.com/bahmutov/try-cra-with-unit-test), typical full config with specs and source files in `src` folder (before [ejecting the app](https://github.com/bahmutov/cypress-react-unit-test/issues/134)):

```json
{
  "fixturesFolder": false,
  "pluginsFile": "node_modules/cypress-react-unit-test/plugins/cra-v3",
  "supportFile": "node_modules/cypress-react-unit-test/support",
  "testFiles": "**/*.spec.js",
  "experimentalComponentTesting": true,
  "componentFolder": "src"
}
```

If you already have a plugins file, you can use a file preprocessor that points at CRA's webpack

```js
// your project's Cypress plugin file
const craFilePreprocessor = require('cypress-react-unit-test/plugins/cra-v3/file-preprocessor')
module.exports = on => {
  on('file:preprocessor', craFilePreprocessor())
}
```

**Bonus:** re-using the config means if you create your application using `create-react-app --typescript`, then TypeScript transpile just works out of the box. See [bahmutov/try-cra-app-typescript](https://github.com/bahmutov/try-cra-app-typescript).

## Your webpack config

If you have your own webpack config, you can use included plugins file to load it. Here is the configuration using the included plugins file and passing the name of the config file via `env` variable in the `cypress.json` file

```json
{
  "pluginsFile": "node_modules/cypress-react-unit-test/plugins/load-webpack",
  "env": {
    "webpackFilename": "demo/config/webpack.dev.js"
  }
}
```
