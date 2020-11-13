/// <reference types="cypress" />
import React from 'react'
import { mountHook } from 'cypress-react-unit-test'
const { useCustomHook } = require('./custom-hook')
import { Provider } from 'react-redux'
import store from './store'

describe('custom hook that needs redux provider', () => {
  it('mounted with wrapper', () => {
    const wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    )

    cy.spy(console, 'log').as('log')
    mountHook(() => useCustomHook(), { wrapper })

    // make sure the custom hook calls "useEffect"
    cy.get('@log').should('have.been.calledWith', 'hello world!')
  })
})
