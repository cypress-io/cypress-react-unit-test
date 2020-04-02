const filePreprocessor = require('./file-preprocessor')

module.exports = (on) => {
  on('file:preprocessor', filePreprocessor())
}
