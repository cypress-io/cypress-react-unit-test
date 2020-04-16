const debug = require('debug')('cypress-react-unit-test')
const path = require('path')

/**
 * User code:
 *   import image from './path/to/image.png'
 *   <img src={image} />
 * This loader will return you
 *   image is "/__root/path/to/image.png"
 *   <img src={image} />
 */
function staticResourceLoader() {
  debug('loading static resource %s', this.resourcePath)
  debug('cwd', process.cwd())
  const relativeResourcePath = path.relative(process.cwd(), this.resourcePath)
  debug('relative resource', relativeResourcePath)
  const staticResourceUrl = `/__root/${relativeResourcePath}`
  debug('static resource url: %s', staticResourceUrl)

  return `module.exports = ${JSON.stringify(staticResourceUrl)}`
}

module.exports = staticResourceLoader
