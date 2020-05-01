// prevent user from importing source file
// that does ReactDOM.render(<App />, document.getElementById('root'))
const _getEl = document.getElementById.bind(document)

let warning: string | undefined

document.getElementById = id => {
  if (id === 'root') {
    // this is most likely because application source code
    // includes ReactDOM.render(<App />, document.getElementById('root'))
    // which specs should NOT DO.
    const found = _getEl(id)
    if (found) {
      return found
    }

    // So in this case we give a fake element that is not part of the doc
    // and set a warning to be displayed when the test runs
    warning = [
      '[cypress-react-unit-test] ⚠️ Seems spec file imports source file',
      'that tries to use `ReactDOM.render(...) directly. Please refactor',
      'the code to not render any components from files reachable from specs',
      'See https://github.com/bahmutov/cypress-react-unit-test/issues/158',
    ].join(' ')
    const hiddenElement = document.createElement('div')
    return hiddenElement
  }

  return _getEl(id)
}

/** Initialize an empty document with root element */
function renderTestingPlatform() {
  // Let's mount components under a new div with this id
  const rootId = 'cypress-root'

  const document = cy.state('document') as Document
  if (document.getElementById(rootId)) {
    return
  }

  const rootNode = document.createElement('div')
  rootNode.setAttribute('id', rootId)
  document.getElementsByTagName('body')[0].prepend(rootNode)

  const selector = '#' + rootId
  return cy.get(selector, { log: false })
}

before(() => {
  if (warning) {
    cy.log(warning)
    warning = undefined
  }

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
