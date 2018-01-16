/* eslint-env mocha */
after(function writeCoverage () {
  console.log('writing coverage', window.__coverage__)
  const s = JSON.stringify(window.__coverage__, null, 2)
  cy.log('saving coverage.json')
  cy.writeFile('coverage.json', s + '\n\n')
  cy.log('generate coverage report')
  cy
    .exec('./node_modules/.bin/istanbul report --verbose html', {
      failOnNonZeroExit: false
    })
    .then(result => {
      cy.log(result.stdout)
      cy.log(result.stderr)
    })
  cy.wait(1000)
  cy.screenshot('write-coverage')
})
