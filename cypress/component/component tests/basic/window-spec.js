/// <reference types="cypress" />
import React from 'react'
import { mount } from 'cypress-react-unit-tests'

export class Component extends React.Component {
  constructor(props) {
    super(props)
    console.log(
      'set window.counter to this component in window',
      window.location.pathname,
    )
    window.component = this
  }

  render() {
    return <p>component</p>
  }
}

it('has the same window from the component as from test', () => {
  cy.window()
    .its('location')
    .should('have.property', 'pathname', 'blank')

  mount(<Component />)
  cy.contains('component')
  cy.window()
    .its('location.pathname')
    .then(console.log)
})
