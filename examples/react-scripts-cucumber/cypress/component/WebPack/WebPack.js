/// <reference types="Cypress" />

const { Given, Then } = require('cypress-cucumber-preprocessor/steps')

Given(`webpack is configured`, () => {})

Then('this test should work just fine!', () => {
  cy.wrap(42).should('equal', 42)
})
