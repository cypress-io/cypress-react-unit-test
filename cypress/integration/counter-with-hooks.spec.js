/// <reference types="cypress" />
/// <reference types="../../lib" />

import React from "react";
import ReactDom from "react-dom";
import { mount } from "cypress-react-unit-tests";
import CounterWithHooks from "../../src/counter-with-hooks.jsx";

describe("CounterWithHooks component", function() {
  it("works", function() {
    mount(<CounterWithHooks /* key="1" */ initialCount={3} />, { ReactDom });
    cy.contains("3");
  });

  it("counts clicks 2", () => {
    mount(<CounterWithHooks /* key="2" */ initialCount={0} />, { ReactDom });
    cy.contains("0");
    cy.get("#increment").click();
    cy.contains("1");
    cy.get("#increment").click();
    cy.contains("2");
  });
});
