import React from 'react'
import { mount } from 'cypress-react-unit-test'
import Fetcher from './fetcher'

// skipping because getting bundling error
// https://github.com/bahmutov/cypress-react-unit-test/issues/484
// https://testing-library.com/docs/cypress-testing-library/intro
// import '@testing-library/cypress/add-commands'

it.skip('loads and displays greeting (testing-lib)', () => {
  cy.server()
  cy.route('/greeting', { greeting: 'Hello there' }).as('greet')

  const url = '/greeting'
  mount(<Fetcher url={url} />)

  cy.findByText('Load Greeting')
    .wait(1000)
    .click()
  cy.findByRole('heading').should('have.text', 'Hello there')
  cy.findByRole('button').should('be.disabled')
  cy.get('@greet')
    .its('url')
    .should('match', /\/greeting$/)
})
