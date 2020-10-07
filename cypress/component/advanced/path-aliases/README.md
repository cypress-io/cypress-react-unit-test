# path-aliases

Specs can import components (and other files) using path aliases defined in the Webpack config file. For example [spec.js](spec.js) uses the following alias to load the component

```js
import Hello from '@advanced/path-aliases/Hello'
```

And the Webpack config file in `cypress/plugins` defines this alias

```js
const webpackOptions = {
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      // exercise path aliases in the specs
      // https://glebbahmutov.com/blog/using-ts-aliases-in-cypress-tests/
      '@advanced': path.resolve(__dirname, '..', 'component', 'advanced'),
    },
  },
}
```
