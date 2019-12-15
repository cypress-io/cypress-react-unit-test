/// <reference types="cypress" />
/// <reference types="../../lib" />

import React from "react";
import { mount } from "cypress-react-unit-tests";
import CounterWithHooks from "../../src/counter-with-hooks.jsx";

/* eslint-env mocha */
describe("CounterWithHooks component", function() {
  it("works", function() {
    mount(<CounterWithHooks initialCount={3} />);
    cy.contains("3");
  });

  it('counts clicks 2', () => {
    mount(<CounterWithHooks initialCount={0} />)
    cy.contains('0')
    cy.get("#increment").click()
    cy.contains('1')
    cy.get("#increment").click()
    cy.contains('2')
  })
});
