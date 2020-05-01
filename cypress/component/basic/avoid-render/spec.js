import React from 'react'
import { mount } from 'cypress-react-unit-test'
// importing source file that does ReactDOM.render
import App from '.'

describe('App', () => {
  it('loads', () => {
    mount(<App />)
    cy.contains('App is here').should('be.visible')
  })
})
