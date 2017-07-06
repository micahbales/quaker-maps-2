const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const javascript = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader'
};

const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins() { return [autoprefixer({ browsers: 'last 3 versions' })]; }
  }
}

const styles = {
  test: /\.(scss)$/,
  use: ExtractTextPlugin.extract(['css-loader?sourceMap', postcss, 'sass-loader?sourceMap'])
};

const config = {
  entry: {
    App: './public/javascripts/app.js'
  },
  devtool: 'source-map',
  // determine where we output our bundled javascript
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    // set rules for processing javascript and styles
    rules: [javascript, styles]
  },
  plugins: [
    // output our css to a separate file
    new ExtractTextPlugin('style.css'),
  ]
}

module.exports = config;
