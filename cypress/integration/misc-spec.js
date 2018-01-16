/* eslint-env mocha */
describe('cy exec', () => {
  it('has shell', () => {
    cy.exec('which node', { failOnNonZeroExit: false }).then(result => {
      cy.log(result.stdout)
      cy.log(result.stderr)
    })
    cy.wait(1000)
    cy.screenshot('which-node')
  })
})
