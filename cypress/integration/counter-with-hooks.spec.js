/// <reference types="cypress" />
/// <reference types="../../lib" />

import React from "react";
import ReactDom from "react-dom";
import CounterWithHooks from "../../src/counter-with-hooks.jsx";
import { mount } from "../../dist";

/* eslint-env mocha */
describe("CounterWithHooks component", function() {
  it("works", function() {
    mount(<CounterWithHooks initialCount={3} />, { ReactDom });
    cy.contains("3");
  });
});
