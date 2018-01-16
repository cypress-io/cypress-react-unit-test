/* eslint-env mocha */
after(function writeCoverage () {
  console.log('writing coverage', window.__coverage__)
  const s = JSON.stringify(window.__coverage__, null, 2)
  cy.writeFile('coverage.json', s + '\n\n')
  cy.exec('npm run coverage-report')
})
