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
function insertStyles(styles: string[], document: Document, el: HTMLElement) {
  styles.forEach(style => {
    const styleElement = document.createElement('style')
    styleElement.appendChild(document.createTextNode(style))
    document.body.insertBefore(styleElement, el)
  })
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
  // first insert all stylesheets as Link elements
  const stylesheets = options.stylesheet ? [options.stylesheet] : []

  if (typeof options.stylesheets === 'string') {
    options.stylesheets = [options.stylesheets]
  }
  if (options.stylesheets) {
    stylesheets.concat(options.stylesheets)
  }

  insertStylesheets(stylesheets, document, el)

  // insert any styles as <style>...</style> elements
  const styles = []
  if (typeof options.style === 'string') {
    styles.push(options.style)
  }
  if (typeof options.styles === 'string') {
    styles.push(options.styles)
  } else if (Array.isArray(options.styles)) {
    styles.concat(options.styles)
  }

  insertStyles(styles, document, el)

  // now load any css files by path and add their content
  // as <style>...</style> elements
  const cssFiles = []

  if (typeof options.cssFile === 'string') {
    cssFiles.push(options.cssFile)
  }

  if (typeof options.cssFiles === 'string') {
    cssFiles.push(options.cssFiles)
  } else if (Array.isArray(options.cssFiles)) {
    cssFiles.concat(options.cssFiles)
  }
  return insertLocalCssFiles(cssFiles, document, el)
}
