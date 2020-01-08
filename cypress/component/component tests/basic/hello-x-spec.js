/// <reference types="cypress" />
/// <reference types="../../lib" />
import { HelloX, HelloState } from './hello-x.jsx'
import React from 'react'
import ReactDom from 'react-dom'
import { mount } from 'cypress-react-unit-tests'

/* eslint-env mocha */
describe('HelloX component', () => {
  it('works', () => {
    mount(<HelloX name="SuperMan" />)
    cy.contains('Hello SuperMan!')
  })

  it('renders Unicode', () => {
    mount(<HelloX name="🌎" />)
    cy.contains('Hello 🌎!')
    cy.percySnapshot('Hello globe')
    cy.wait(1000)
  })
})
