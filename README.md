# cypress-react-unit-test [![CircleCI](https://circleci.com/gh/bahmutov/cypress-react-unit-test/tree/master.svg?style=svg)](https://circleci.com/gh/bahmutov/cypress-react-unit-test/tree/master) [![Cypress.io tests](https://img.shields.io/badge/cypress.io-tests-green.svg?style=flat-square)](https://dashboard.cypress.io/#/projects/z9dxah) [![renovate-app badge][renovate-badge]][renovate-app] [![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/bahmutov/cypress-react-unit-test)

> A little helper to unit test React components in the open source [Cypress.io](https://www.cypress.io/) E2E test runner **ALPHA**

## TLDR

* What is this? This package allows you to use [Cypress](https://www.cypress.io/) test runner to unit test your React components with zero effort.

* How is this different from [Enzyme](https://github.com/airbnb/enzyme)? It is similar in functionality BUT runs the component in the real browser with full power of Cypress E2E test runner: [live GUI, full API, screen recording, CI support, cross-platform](https://www.cypress.io/features/).

## Known problems

- [ ] some DOM events are not working when running all tests at once [#4](https://github.com/bahmutov/cypress-react-unit-test/issues/4)
- [x] cannot mock server XHR for injected components [#5](https://github.com/bahmutov/cypress-react-unit-test/issues/5)
- [x] cannot spy on `window.alert` [#6](https://github.com/bahmutov/cypress-react-unit-test/issues/6)

## Install

Requires [Node](https://nodejs.org/en/) version 8 or above.

```sh
npm install --save-dev cypress cypress-react-unit-test
```

If you need help configuring bundler, see [preprocessors info](https://gitpitch.com/cypress-io/testing-workshop-cypress?p=slides/16-preprocessors)

## Use

Include this plugin from `cypress/support/index.js`

```js
import 'cypress-react-unit-test'
```

This adds a new command `cy.mount` that can mount a React component. It also overloads `cy.get` to accept in addition to selectors React component, returning it. See examples below.

## Example

```js
// load Cypress TypeScript definitions for IntelliSense
/// <reference types="cypress" />
// import the component you want to test
import { HelloState } from '../../src/hello-x.jsx'
import React from 'react'
describe('HelloState component', () => {
  it('works', () => {
    // mount the component under test
    cy.mount(<HelloState />)
    // start testing!
    cy.contains('Hello Spider-man!')
    // mounted component can be selected via its name, function, or JSX
    // e.g. '@HelloState', HelloState, or <HelloState />
    cy.get(HelloState)
      .invoke('setState', { name: 'React' })
    cy.get(HelloState)
      .its('state')
      .should('deep.equal', { name: 'React' })
    // check if GUI has rerendered
    cy.contains('Hello React!')
  })
})
```

![Unit testing React components](images/demo.png)

### styles

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
  cy.mount(<Button name='Orange' orange />, null, { style })
  cy.get('.orange button')
    .should('have.css', 'background-color', 'rgb(245, 146, 62)')
})
```

Often your component rely on global CSS style imported from the root `index.js` or `app.js` file

```js
// index.js
import './styles.css'
// bootstrap application
```

You can read the CSS file and pass it as `style` option yourself

```js
cy.readFile('cypress/integration/Button.css')
  .then(style => {
    cy.mount(<Button name='Orange' orange />, null, { style })
  })
```

You can even let Cypress read the file and inject the style

```js
const cssFile = 'cypress/integration/Button.css'
cy.mount(<Button name='Orange' orange />, null, { cssFile })
```

See [cypress/integration/inject-style-spec.js](cypress/integration/inject-style-spec.js) for more examples.

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

### Create React App users

If you are using Create-React-App v3, and want to reuse the built in webpack before ejecting, this module ships with Cypress preprocessor in [plugins](plugins) folder. From the `cypress.json` point at the shipped plugin in the `node_modules`.

```json
{
  "pluginsFile": "node_modules/cypress-react-unit-test/plugins/cra-v3"
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

## Examples

All components are in [src](src) folder. All tests are in [cypress/integration](cypress/integration) folder.

* [hello-world-spec.js](cypress/integration/hello-world-spec.js) - testing the simplest React component from [hello-world.jsx](src/hello-world.jsx)
* [hello-x-spec.js](cypress/integration/hello-x-spec.js) - testing React component with props and state [hello-x.jsx](src/hello-x.jsx)
* [counter-spec.js](cypress/integration/counter-spec.js) clicks on the component and confirms the result
* [stateless-spec.js](cypress/integration/stateless-spec.js) shows testing a stateless component from [stateless.jsx](src/stateless.jsx)
* [transpiled-spec.js](cypress/integration/stateless-spec.js) shows testing a component with class properties syntax from [transpiled.jsx](src/stateless.jsx)
* [error-boundary-spec.js](cypress/integration/error-boundary-spec.js) shows testing a component acting as an error boundary from [error-boundary.jsx](src/error-boundary.jsx)
* [users-spec.js](cypress/integration/users-spec.js) shows how to observe XHR requests, mock server responses for component [users.jsx](src/users.jsx)
* [alert-spec.js](cypress/integration/alert-spec.js) shows how to spy on `window.alert` calls from your component [stateless-alert.jsx](src/stateless-alert.jsx)

## Large examples

* [bahmutov/calculator](https://github.com/bahmutov/calculator) tests multiple components: calculator App, Button, Display.

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

* [cypress-vue-unit-test](https://github.com/bahmutov/cypress-vue-unit-test)
* [cypress-cycle-unit-test](https://github.com/bahmutov/cypress-cycle-unit-test)
* [cypress-svelte-unit-test](https://github.com/bahmutov/cypress-svelte-unit-test)
* [cypress-angular-unit-test](https://github.com/bahmutov/cypress-angular-unit-test)
* [cypress-hyperapp-unit-test](https://github.com/bahmutov/cypress-hyperapp-unit-test)
* [cypress-angularjs-unit-test](https://github.com/bahmutov/cypress-angularjs-unit-test)

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
