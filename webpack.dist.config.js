/* eslint-disable */
var webpack = require('webpack');
var path = require('path');
var config = require('./webpack.config');

config.output = {
  filename: '[name]_[hash].bundle.js',
  // publicPath: '.',
  path: path.resolve(__dirname, 'dist')
};

config.plugins = config.plugins.concat([

  // Reduces bundles total size
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: false,
  })
]);

module.exports = config;