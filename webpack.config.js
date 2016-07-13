/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'sourcemap',
  entry: {},
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [/app\/lib/, /node_modules/],
      loader: 'ng-annotate!babel'
    }
    , {
      test: /\.json/,
      loader: 'json'
    }, {
      test: /\.html$/,
      loader: 'raw'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file"
    }, {
      test: /\.(woff|woff2)$/,
      loader: "url?prefix=font/&limit=5000"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=image/svg+xml"
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract("style", "css!sass")
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style", "css")
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[name]_[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    }]
  },
  plugins: [

    new ExtractTextPlugin("[name]_[hash].css"),

    // Required by Bootstrap
    new webpack.ProvidePlugin({
      d3: "d3",
      $: "jquery",
      jQuery: "jquery"
    }),
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: 'body',
      hash: false
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    })
  ]
};