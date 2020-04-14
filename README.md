# cypress-react-unit-test [![CircleCI](https://circleci.com/gh/bahmutov/cypress-react-unit-test/tree/master.svg?style=svg)](https://circleci.com/gh/bahmutov/cypress-react-unit-test/tree/master) [![Cypress.io tests](https://img.shields.io/badge/cypress.io-tests-green.svg?style=flat-square)](https://dashboard.cypress.io/#/projects/z9dxah) [![renovate-app badge][renovate-badge]][renovate-app] [![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/bahmutov/cypress-react-unit-test)

> A little helper to unit test React components in the open source [Cypress.io](https://www.cypress.io/) E2E test runner **ALPHA**

## TLDR

- What is this? This package allows you to use [Cypress](https://www.cypress.io/) test runner to unit test your React components with zero effort.

- How is this different from [Enzyme](https://github.com/airbnb/enzyme)? It is similar in functionality BUT runs the component in the real browser with full power of Cypress E2E test runner: [live GUI, full API, screen recording, CI support, cross-platform](https://www.cypress.io/features/).

## Known problems

See issues labeled [v2](https://github.com/bahmutov/cypress-react-unit-test/labels/v2)

## Install

Requires [Node](https://nodejs.org/en/) version 8 or above.

```sh
npm install --save-dev cypress cypress-react-unit-test
```

## Use

Include this plugin from your project's `cypress/support/index.js`

```js
require('cypress-react-unit-test/dist/hooks')
```

Then turn the experimental component support on in your `cypress.json`. You can also specify where component spec files are located. For exampled to have them located in `src` folder use:

```json
{
  "experimentalComponentTesting": true,
  "componentFolder": "src"
}
```

## Example

```js
import React from 'react'
import { mount } from 'cypress-react-unit-test'
import { HelloWorld } from './hello-world.jsx'
describe('HelloWorld component', () => {
  it('works', () => {
    mount(<HelloWorld />)
    // now use standard Cypress commands
    cy.contains('Hello World!').should('be.visible')
  })
})
```

### styles

If you component imports its own style, the style should be applied during the Cypress test. But sometimes you need more power.

You can 3 options to load additional styles:

```js
mount(<Component />, {
  style: string, // load inline style CSS
  cssFiles: string | string[], // load a single or a list of local CSS files
  stylesheets: string | string[] // load external stylesheets
})
```

#### Inline styles

You can add individual style to the mounted component by passing its text as an option

```js
it('can be passed as an option', () => {
  const style = `
    .component-button {
      display: inline-flex;
      width: 25%;
      flex: 1 0 auto;
    }

    .component-button.orange button {
      background-color: #F5923E;
      color: white;
    }
  `
  cy.mount(<Button name="Orange" orange />, { style })
  cy.get('.orange button').should(
    'have.css',
    'background-color',
    'rgb(245, 146, 62)',
  )
})
```

#### Load local CSS file

```js
const cssFiles = 'cypress/integration/Button.css'
cy.mount(<Button name="Orange" orange />, { cssFiles })
```

See [cypress/integration/inject-style-spec.js](cypress/integration/inject-style-spec.js) for more examples.

#### Load external stylesheets

```js
mount(<Todo todo={todo} />, {
  stylesheets: [
    'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.css',
  ],
})
```

## Configuration

If your React and React DOM libraries are installed in non-standard paths (think monorepo scenario), you can tell this plugin where to find them. In `cypress.json` specify paths like this:

```json
{
  "env": {
    "cypress-react-unit-test": {
      "react": "node_modules/react/umd/react.development.js",
      "react-dom": "node_modules/react-dom/umd/react-dom.development.js"
    }
  }
}
```

## Transpilation

How can we use features that require transpilation? By using [@cypress/webpack-preprocessor](https://github.com/cypress-io/cypress-webpack-preprocessor#readme) - see the plugin configuration in [cypress/plugins/index.js](cypress/plugins/index.js)

## Code coverage

If you are using [plugins/cra-v3](plugins/cra-v3) it instruments the code on the fly using `babel-plugin-istanbul` and generates report using dependency [cypress-io/code-coverage](https://github.com/cypress-io/code-coverage) (included). If you want to disable code coverage instrumentation and reporting, use `--env coverage=false` or `CYPRESS_coverage=false` or set in your `cypress.json` file

```json
{
  "env": {
    "coverage": false
  }
}
```

### React Scripts App users

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

## Examples

Look at the examples in [cypress/component](cypress/component) folder.

## Large examples

<!-- prettier-ignore-start -->
Repo | description
--- | ---
[try-cra-with-unit-test](https://github.com/bahmutov/try-cra-with-unit-test) | Hello world initialized with CRAv3
[try-cra-app-typescript](https://github.com/bahmutov/try-cra-app-typescript) | Hello world initialized with CRAv3 `--typescript`
[react-todo-with-hooks](https://github.com/bahmutov/react-todo-with-hooks) | Modern web application using hooks
[test-redux-examples](https://github.com/bahmutov/test-redux-examples) | Example apps copies from official Redux repo and tested as components
[test-react-hooks-animations](https://github.com/bahmutov/test-react-hooks-animations) | Testing React springs fun blob animation
[test-mdx-example](https://github.com/bahmutov/test-mdx-example) | Example testing MDX components using Cypress
[test-apollo](https://github.com/bahmutov/test-apollo) | Component testing an application that uses Apollo GraphQL library
[test-xstate-react](https://github.com/bahmutov/test-xstate-react) | XState component testing using Cypress
[test-react-router-v5](https://github.com/bahmutov/test-react-router-v5) | A few tests of React Router v5
[test-material-ui](https://github.com/bahmutov/test-material-ui) | Testing Material UI components: date pickers, lists, autocomplete
[test-d3-react-gauge](https://github.com/bahmutov/test-d3-react-gauge) | Testing React D3 gauges
<!-- prettier-ignore-end -->

To find more examples, see GitHub topic [cypress-react-unit-test-example](https://github.com/topics/cypress-react-unit-test-example)

## Development

To get started with this repo, compile the plugin's code and the examples code

```shell
npm run transpile
npm run build
npm run cy:open
```

- run TypeScript compiler in watch mode with `npx tsc -w`
- run Cypress with `npx cypress open` and select the spec you want to work with
- edit `lib/index.ts` where all the magic happens

### Visual testing

Uses [Percy.io](https://percy.io) visual diffing service as a GitHub pull request check.

## Related tools

Same feature for unit testing components from other frameworks using Cypress

- [cypress-vue-unit-test](https://github.com/bahmutov/cypress-vue-unit-test)
- [cypress-cycle-unit-test](https://github.com/bahmutov/cypress-cycle-unit-test)
- [cypress-svelte-unit-test](https://github.com/bahmutov/cypress-svelte-unit-test)
- [cypress-angular-unit-test](https://github.com/bahmutov/cypress-angular-unit-test)
- [cypress-hyperapp-unit-test](https://github.com/bahmutov/cypress-hyperapp-unit-test)
- [cypress-angularjs-unit-test](https://github.com/bahmutov/cypress-angularjs-unit-test)

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
