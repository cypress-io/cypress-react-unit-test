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

/**
 * Remove any style or extra link elements from the iframe placeholder
 * left from any previous test
 *
 */
function cleanupStyles() {
  const document = cy.state('document') as Document

  const styles = document.body.querySelectorAll('style')
  styles.forEach(styleElement => {
    document.body.removeChild(styleElement)
  })

  const links = document.body.querySelectorAll('link[rel=stylesheet]')
  links.forEach(link => {
    document.body.removeChild(link)
  })
}

beforeEach(cleanupStyles)
