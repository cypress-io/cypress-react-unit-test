/// <reference types="cypress" />
/// <reference types="../../lib" />
import { HelloWorld } from '../../src/hello-world.jsx'
import React from 'react'
import ReactDom from "react-dom";
import { mount } from "cypress-react-unit-tests";

/* eslint-env mocha */
describe('HelloWorld component', () => {
  it('works', () => {
    mount(<HelloWorld />)
    cy.contains('Hello World!')
  })
})
