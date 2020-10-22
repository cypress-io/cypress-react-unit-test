/// <reference types="cypress" />
import React from 'react'
import { mount } from 'cypress-react-unit-test'
// use path alias defined in webpack config
import Hello from '@components/Hello'

describe('Hello using path alias', () => {
  it('works', () => {
    mount(<Hello />)
    cy.contains('Hello!').should('be.visible')
  })
})
