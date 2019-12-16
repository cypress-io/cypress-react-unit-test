import * as React from "react";
import ReactDOM from "react-dom";
import getDisplayName from "./getDisplayName";

const setXMLHttpRequest = w => {
  // by grabbing the XMLHttpRequest from app's iframe
  // and putting it here - in the test iframe
  // we suddenly get spying and stubbing 😁
  // @ts-ignore
  window.XMLHttpRequest = w.XMLHttpRequest;
  return w;
};

const setAlert = w => {
  window.alert = w.alert;
  return w;
};

/** Initialize an empty document with root element */
function renderTestingPlatform() {
  cy.log("Prepearing to ReactDOM rendering");

  const document = cy.state("document");
  document.write`
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <div id="cypress-jsdom"></div>
  </body>`;

  return cy.get("#cypress-jsdom", { log: false });
}

function checkMountModeEnabled() {
  // @ts-ignore
  if (!Cypress.config("mountMode")) {
    throw new Error(
      `In order to use mount function please specify { "mountMode": true } in your cypress.json`
    );
  }
}

interface MountOptions {
  alias?: string;
  ReactDom?: typeof ReactDOM;
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
  // checkMountModeEnabled();

  // Get the display name property via the component constructor
  // @ts-ignore FIXME
  const displayname = getDisplayName(jsx.type, options.alias);

  cy.window({ log: false })
    .then(() => {
      Cypress.log({
        name: "mount",
        message: [`ReactDOM.render(<${displayname} ... />)`],
        consoleProps() {
          return {
            props: jsx.props
          };
        }
      });
    })
    .then(setXMLHttpRequest)
    .then(setAlert)
    .then(() => {
      const document = cy.state("document");
      const reactDomToUse = options.ReactDom || ReactDOM;

      const props = {
        // @ts-ignore provide unique key to the the wrapped component to make sure we are rerendering between tests
        key: Cypress?.mocha?.getRunner()?.test?.title || Math.random()
      };

      const CypressTestComponent = reactDomToUse.render(
        React.createElement(React.Fragment, props, jsx),
        document.getElementById("cypress-jsdom")
      );

      cy.wrap(CypressTestComponent, { log: false }).as(
        options.alias || displayname
      );
    });
};

before(() => {
  renderTestingPlatform();
});

export default mount;
