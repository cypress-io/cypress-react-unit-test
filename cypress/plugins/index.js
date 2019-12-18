const path = require("path");
const webpack = require("@cypress/webpack-preprocessor");
const babelConfig = require("../../babel.config.js");

const webpackOptions = {
  // https://webpack.js.org/configuration/node/
  // avoid winston logger problem
  // https://github.com/percy/percy-cypress/issues/58
  node: {
    fs: "empty"
  },
  resolve: {
    alias: {
      react: path.resolve("./node_modules/react")
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        loader: "babel-loader",
        options: babelConfig
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};

const options = {
  // send in the options from your webpack.config.js, so it works the same
  // as your app's code
  webpackOptions,
  watchOptions: {}
};

module.exports = on => {
  on("file:preprocessor", webpack(options));
};
