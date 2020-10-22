/// <reference types="cypress" />
import React from 'react'
import { mount } from 'cypress-react-unit-test'
import { Component } from './component'

it('has the same window from the component as from test', () => {
  cy.window()
    .its('location')
    .should('have.property', 'pathname')
    .and('not.equal', 'blank')

  mount(<Component />)

  cy.contains('component')
  cy.window()
    .its('location.pathname')
    // this filename
    .should('match', /window\/spec\.js$/)

  // the window should have property set by the component
  cy.window().should('have.property', 'component')

  // the "window" object as seen by the component
  // is the window object of the spec code
  cy.window().should('have.property', 'componentsWindow', window)
})
