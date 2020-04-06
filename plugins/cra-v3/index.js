const filePreprocessor = require('./file-preprocessor')

module.exports = (on, config) => {
  on('file:preprocessor', filePreprocessor(config))
  on('task', require('@cypress/code-coverage/task')(on, config))
  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config
}
