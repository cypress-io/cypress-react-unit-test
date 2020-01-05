/** Initialize an empty document with root element */
function renderTestingPlatform() {
  cy.log('Prepearing to ReactDOM rendering')

  const document = cy.state('document') as Document
  if (document.getElementById('cypress-jsdom')) {
    return
  }

  const rootNode = document.createElement('div')
  rootNode.setAttribute('id', 'cypress-jsdom')
  document.getElementsByTagName('body')[0].prepend(rootNode)

  return cy.get('#cypress-jsdom', { log: false })
}

before(() => {
  renderTestingPlatform()
})
