/// <reference types="cypress" />
import React from 'react'
import { mount } from 'cypress-react-unit-test'
import App from './App.js'

describe('App', () => {
  const APP_URL = 'https://jsonplaceholder.cypress.io'

  // don't forget to reset the "window._env" before and after tests
  // to avoid accidentally leaking it into unrelated tests
  const cleanUp = () => delete window._env
  beforeEach(cleanUp)
  afterEach(cleanUp)

  it('fetches from given url', () => {
    window._env = {
      APP_URL,
    }
    mount(<App />)
    cy.contains('Fetched user Sincere@april.biz')
  })

  it('does not leak window._env', () => {
    cy.wrap(window._env)
      .should('be.undefined')
      .then(() => {
        expect('_env' in window).to.be.false
      })
  })

  it('can spy on the network call to avoid hard-coding the email', () => {
    cy.server()
    cy.route('users/1').as('users')
    window._env = {
      APP_URL,
    }
    mount(<App />)
    cy.wait('@users')
      .its('responseBody.email')
      .then(email => {
        cy.contains(`Fetched user ${email}`).should('be.visible')
      })
  })

  it('can use stubbed response', () => {
    cy.server()
    cy.route('users/1', { email: 'test-user@cypress.io' })
    window._env = {
      APP_URL,
    }
    mount(<App />)
    cy.contains('Fetched user test-user@cypress.io')
  })
})
