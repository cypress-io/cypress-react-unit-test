import React from "react";
import { mount } from "cypress-react-unit-tests";
import { Emotion } from "../../src/CssInJsComponent.jsx";

describe("Emotion css-in-js component", () => {
  it("renders css", () => {
    mount(<Emotion />);

    cy.contains("Emotion").should("have.css", "color", "rgb(255, 105, 180)");
  });
});
