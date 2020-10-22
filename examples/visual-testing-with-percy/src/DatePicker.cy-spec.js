/// <reference types="cypress" />
import React from 'react'
import { mount } from 'cypress-react-unit-test'
// import MaterialUIPickers from './DatePicker'

describe('Material UI date picker', () => {
  it('sanity', () => {
    expect(mount).to.be.a('function')
  })

  // https://github.com/bahmutov/cypress-react-unit-test/issues/507
  // SKIP https://github.com/bahmutov/cypress-react-unit-test/pull/506#issuecomment-714124015
  // it.skip('works', () => {
  //   mount(<MaterialUIPickers />)
  //   // confirm the DOM has rendered the widget
  //   cy.get('#date-picker-inline').should('have.value', '08/18/2014')
  //   // then take visual snapshot
  //   cy.percySnapshot('Datepicker initial')

  //   cy.get('button[aria-label="change date"]').click()
  //   // confirm the DOM has rendered the widget
  //   cy.get('.MuiPickersBasePicker-container').should('be.visible')
  //   // then take visual snapshot
  //   cy.percySnapshot('Datepicker opened')
  // })
})
