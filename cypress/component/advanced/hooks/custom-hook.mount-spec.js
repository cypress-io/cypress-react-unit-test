/// <reference types="cypress" />
import React from 'react'
import { mount } from 'cypress-react-unit-test'
const { useCustomHook } = require('./custom-hook')
import { Provider } from 'react-redux'
import store from './store'

describe('custom hook that needs redux provider', () => {
  it('mounts if we make a test component around it', () => {
    const App = () => {
      useCustomHook()

      return <></>
    }
    cy.spy(console, 'log').as('log')
    mount(
      <Provider store={store}>
        <App />
      </Provider>,
    )
    cy.get('@log').should('have.been.calledWith', 'hello world!')
  })
})
