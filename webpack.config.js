'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  // production development
  output: {
    filename: 'script.js',
    path: __dirname + '/js'
  },

  devtool: 'source-map',

  performance: {
    hints: false
  },
  
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env']
            ]
          }
        }
      }
    ]
  }
};
