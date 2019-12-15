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
  return cy.log("Prepearing to ReactDOM rendering").then(() => {
    var html = `
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <div id="cypress-jsdom"></div>
  </body>`;

    const document = cy.state("document");
    document.write(html);
    document.close();
  });
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
 // using specified alias
 cy.get('@Hello').its('state').should(...)
 // using original component
 cy.get(Hello)
 ```
 **/
export const mount = (jsx: React.ReactElement, options: MountOptions = {}) => {
  checkMountModeEnabled();

  // Get the display name property via the component constructor
  // @ts-ignore FIXME
  const displayname = getDisplayName(jsx.type, options.alias);

  renderTestingPlatform()
    .window({ log: false })
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
      const reactDomToUse = options.ReactDom || ReactDOM;

      const document = cy.state("document");
      const component = reactDomToUse.render(
        jsx,
        document.getElementById("cypress-jsdom")
      );

      cy.wrap(component, { log: false }).as(options.alias || displayname);
    });
};

/** Get one or more DOM elements by selector or alias.
    Features extended support for JSX and React.Component
    @function   cy.get
    @param      {string|object|function}  selector
    @param      {object}                  options
    @example    cy.get('@Component')
    @example    cy.get(<Component />)
    @example    cy.get(Component)
**/
Cypress.Commands.overwrite("get", (originalFn, selector, options) => {
  switch (typeof selector) {
    case "object":
      // If attempting to use JSX as a selector, reference the displayname
      if (
        selector.$$typeof &&
        selector.$$typeof.toString().startsWith("Symbol(react")
      ) {
        const displayname = selector.type.prototype.constructor.name;
        return originalFn(`@${displayname}`, options);
      }
    case "function":
      // If attempting to use the component name without JSX (testing in .js/.ts files)
      // const displayname = selector.prototype.constructor.name
      const displayname = getDisplayName(selector);
      return originalFn(`@${displayname}`, options);
    default:
      return originalFn(selector, options);
  }
});

export default mount;
