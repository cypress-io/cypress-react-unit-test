import React from 'react'
import { mount } from 'cypress-react-unit-test'

describe('Dynamic import', () => {
  it('loads function', () => {
    // dynamically import "lazy-add" and use it
    cy.wrap(import('./add'))
      .its('default')
      .then(add => add(2, 3))
      .should('equal', 5)
  })

  it('loads and mounts a component', () => {
    cy.wrap(import('./Child'))
      .its('default')
      .then(Child => mount(<Child />))
    cy.contains('Real child component')
  })
})
