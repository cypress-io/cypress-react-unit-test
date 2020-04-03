/// <reference types="cypress" />
import React from 'react'
import { mount } from 'cypress-react-unit-test'

describe('cssFile', () => {
  it('is loaded', () => {
    const Component = () => <button className="green">Green button</button>
    mount(<Component />, {
      cssFile: 'cypress/component/component tests/basic/css-file/index.css',
    })

    cy.get('button')
      .should('have.class', 'green')
      .and('have.css', 'background-color', 'rgb(0, 255, 0)')
  })
})
