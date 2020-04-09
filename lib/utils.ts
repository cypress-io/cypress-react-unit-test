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
    // console.log('adding stylesheets')
    options.stylesheets.forEach(href => {
      const link = document.createElement('link')
      link.type = 'text/css'
      link.rel = 'stylesheet'
      link.href = href
      document.body.insertBefore(link, el)
    })
  }

  if (options.style) {
    const style = document.createElement('style')
    style.appendChild(document.createTextNode(options.style))
    document.body.insertBefore(style, el)
  }

  if (options.cssFile) {
    return cy.readFile(options.cssFile).then(css => {
      const style = document.createElement('style')
      style.appendChild(document.createTextNode(css))
      document.body.insertBefore(style, el)
    })
  }
}
