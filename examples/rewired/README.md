# example: react-app-rewired

Component tests for apps that use [react-app-rewired](https://github.com/timarney/react-app-rewired)

Main idea: find and load Webpack options using [find-webpack](https://github.com/bahmutov/find-webpack) module, then pass it through the [config-overrides.js](config-overrides.js) file. Then give it to the Cypress Webpack preprocessor. See [cypress/plugins/index.js](cypress/plugins/index.js) for details.

TODO: go through the rest of the spec files in [src](src) folder to make sure they work.
TODO: validate the code coverage

## Usage

1. Make sure the root project has been built .

```bash
# in the root of the project
npm install
npm run build
```

2. Run `npm install` in this folder to symlink the `cypress-react-unit-test` dependency.

```bash
# in this folder
npm install
```

3. Start Cypress

```bash
npm run cy:open
# or just run headless tests
npm test
```

## Debugging

You can see the Webpack config by running Cypress with `DEBUG=overrides` environment variable.
