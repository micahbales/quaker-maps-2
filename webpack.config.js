const path = require('path');

const javascript = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader'
};

const config = {
  entry: {
    App: './public/javascripts/app.js'
  },
  module: {
    rules: [javascript]
  },
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: '[name].bundle.js'
  }
}

module.exports = config;
