/// <reference types="cypress" />
/// <reference types="../../lib" />
import {HelloX} from '../../src/hello-x.jsx'
import React from 'react'

/* eslint-env mocha */
describe('Alias', () => {
  it('uses default display name', () => {
    cy.mount(<HelloX name='World' />, {alias: 'HelloX'})
      .then(function () {
        expect(this.HelloX).to.be.an('object')
      })
    cy.get('@HelloX').should('be.an', 'object')
  })
})
