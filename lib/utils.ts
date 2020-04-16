/**
 * Insert links to external style resources.
 */
function insertStylesheets(
  stylesheets: string[],
  document: Document,
  el: HTMLElement,
) {
  stylesheets.forEach(href => {
    const link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = href
    document.body.insertBefore(link, el)
  })
}

/**
 * Inserts a single stylesheet element
 */
function insertStyles(style: string, document: Document, el: HTMLElement) {
  const styleElement = document.createElement('style')
  styleElement.appendChild(document.createTextNode(style))
  document.body.insertBefore(styleElement, el)
}

function insertSingleCssFile(
  cssFilename: string,
  document: Document,
  el: HTMLElement,
) {
  return cy.readFile(cssFilename).then(css => {
    const style = document.createElement('style')
    style.appendChild(document.createTextNode(css))
    document.body.insertBefore(style, el)
  })
}

/**
 * Reads the given CSS file from local file system
 * and adds the loaded style text as an element.
 */
function insertLocalCssFiles(
  cssFilenames: string[],
  document: Document,
  el: HTMLElement,
) {
  return Cypress.Promise.mapSeries(cssFilenames, cssFilename =>
    insertSingleCssFile(cssFilename, document, el),
  )
}

/**
 * Injects custom style text or CSS file or 3rd party style resources
 * into the given document.
 */
export const injectStylesBeforeElement = (
  options: Partial<StyleOptions>,
  document: Document,
  el: HTMLElement,
) => {
  // insert any custom global styles before the component
  if (typeof options.stylesheets === 'string') {
    options.stylesheets = [options.stylesheets]
  }
  if (Array.isArray(options.stylesheets)) {
    insertStylesheets(options.stylesheets, document, el)
  }

  if (options.style) {
    insertStyles(options.style, document, el)
  }

  if (Array.isArray(options.cssFiles)) {
    return insertLocalCssFiles(options.cssFiles, document, el)
  }

  if (typeof options.cssFiles === 'string') {
    return insertSingleCssFile(options.cssFiles, document, el)
  }

  // force this function to have a return value from all branches
  return cy.wrap(null)
}
