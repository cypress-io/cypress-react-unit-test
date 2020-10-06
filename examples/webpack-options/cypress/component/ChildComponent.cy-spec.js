/// <reference types="cypress" />
import React from 'react'
import { mount } from 'cypress-react-unit-test'
import ChildComponent from './ChildComponent'
import * as calc from './calc'

describe('ChildComponent unstubbed', () => {
  it('works', () => {
    cy.spy(calc, 'getRandomNumber').as('getRandomNumber')
    mount(<ChildComponent />)
    // make sure the component shows the random value
    // returned by the calc.getRandomNumber function
    cy.get('@getRandomNumber')
      .should('have.been.called')
      .its('returnValues.0')
      .then(n => {
        cy.contains('.random', n)
      })
  })
})
