import React from 'react'
import { mount } from 'cypress-react-unit-test'
import { Button } from './Button'
// import the same Button component using path alias
// that should be set up in webpack AND in tsconfig
// https://glebbahmutov.com/blog/using-ts-aliases-in-cypress-tests/
import { Button as SameButton } from '@basic/typescript/Button'

describe('Component spec in typescript', () => {
  it('works', () => {
    mount(<Button>Button Label</Button>)
    cy.contains('button', 'Button Label').should('be.visible')
  })

  it('calls passed on click prop', () => {
    // TODO how to type this?
    // @ts-ignore
    mount(<Button onClick={cy.stub().as('click')}>Click Me</Button>)
    cy.contains('button', 'Click Me').click()
    cy.get('@click').should('have.been.calledOnce')
  })

  it('loads the component using path alias', () => {
    mount(
      // TODO how to type this?
      // @ts-ignore
      <SameButton onClick={cy.stub().as('click')}>Click Me Twice</SameButton>,
    )
    cy.contains('button', 'Click Me Twice')
      .click()
      .click()
    cy.get('@click').should('have.been.calledTwice')
  })
})
