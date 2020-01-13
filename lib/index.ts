import * as React from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import getDisplayName from './getDisplayName'

function checkMountModeEnabled() {
  // @ts-ignore
  if (Cypress.spec.specType !== 'component') {
    throw new Error(
      `In order to use mount or unmount functions please place the spec in component folder`,
    )
  }
}

interface MountOptions {
  alias?: string
  ReactDom?: typeof ReactDOM
}

/**
 * Mount a React component in a blank document; register it as an alias
 * To access: use an alias or original component reference
 *  @function   cy.mount
 *  @param      {React.ReactElement}  jsx - component to mount
 *  @param      {string}  [Component] - alias to use later
 *  @example
 ```
 import Hello from './hello.jsx'
 // mount and access by alias
 cy.mount(<Hello />, 'Hello')
 // using default alias
 cy.get('@Component')
 // using original component
 cy.get(Hello)
 ```
 **/
export const mount = (jsx: React.ReactElement, options: MountOptions = {}) => {
  checkMountModeEnabled()

  // Get the display name property via the component constructor
  // @ts-ignore FIXME
  const displayname = getDisplayName(jsx.type, options.alias)

  return cy
    .window({ log: false })
    .then(() => {
      Cypress.log({
        name: 'mount',
        message: [`ReactDOM.render(<${displayname} ... />)`],
        consoleProps() {
          return {
            props: jsx.props,
          }
        },
      })
    })
    .then(() => {
      const document = cy.state('document')
      const reactDomToUse = options.ReactDom || ReactDOM

      const props = {
        // @ts-ignore provide unique key to the the wrapped component to make sure we are rerendering between tests
        key: Cypress?.mocha?.getRunner()?.test?.title || Math.random(),
      }

      const CypressTestComponent = reactDomToUse.render(
        React.createElement(React.Fragment, props, jsx),
        document.getElementById('cypress-jsdom'),
      )

      cy.wrap(CypressTestComponent, { log: false }).as(
        options.alias || displayname,
      )
    })
}

/**
 * Removes any mounted component
 */
export const unmount = () => {
  checkMountModeEnabled()

  cy.log('unmounting...')
  return cy.get('#cypress-jsdom', { log: false }).then($el => {
    unmountComponentAtNode($el[0])
  })
}

export default mount
