/// <reference types="cypress" />
import * as React from 'react'
import { mount } from 'cypress-react-unit-test'
import { UsingHelper } from '../../components/UsingHelper'

describe('Component using helper with * export', () => {
  it('Renders component', () => {
    mount(<UsingHelper />)

    cy.contains('Hello World!')
  })
})
