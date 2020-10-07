/// <reference types="cypress" />
import React from 'react'
import { mount } from 'cypress-react-unit-test'

// use path alias defined in webpack config used by Cypress
// in reality should resolve to "./Hello.js"
import Hello from '@advanced/path-aliases/Hello'

describe('import path alias', () => {
  it('Hello works', () => {
    mount(<Hello />)
    cy.contains('Hello!').should('be.visible')
  })
})
