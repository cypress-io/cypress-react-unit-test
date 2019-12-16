module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      'module-resolver',
      {
        alias: {
          'cypress-react-unit-tests': './dist/index.js'
        }
      }
    ]
  ]
}
