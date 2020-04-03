/// <reference types="cypress" />
/// <reference types="../../lib" />
import React from 'react'

/* eslint-env mocha */
describe('re-render', () => {
  it('works with El', () => {
    const El = ({ text }) => <div>{text}</div>
    cy.mount(<El text='first' />)
    cy.contains('first')
      .then(() => {
        cy.render(<El text='second' />)
      })
    cy.contains('second')
  })
})
