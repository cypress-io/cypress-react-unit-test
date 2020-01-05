/// <reference types="cypress" />
/// <reference types="../../lib" />
import HelloWorld from '../../src/stateless-alert.jsx'
import React from 'react'
import ReactDom from 'react-dom'
import { mount } from 'cypress-react-unit-tests'

describe('Stateless alert', () => {
  beforeEach(() => {
    const spy = cy.spy().as('alert')
    cy.on('window:alert', spy)
    mount(<HelloWorld name="Alert" />, { ReactDom })
  })

  it('shows link', () => {
    cy.contains('a', 'Say Hi')
  })

  it('alerts with name', () => {
    cy.contains('Say Hi').click()
    cy.get('@alert').should('have.been.calledOnce')
  })
})
