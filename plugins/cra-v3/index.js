const filePreprocessor = require('./file-preprocessor')

module.exports = (on, config) => {
  on('file:preprocessor', filePreprocessor(config))
}
