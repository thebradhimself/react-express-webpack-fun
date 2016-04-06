var webpack = require('webpack');
var path = require('path');
module.exports = {
  entry: {
    app: './app/index',
    board: './app/boards'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: "[name].js",
    chunkFilename: "[id].chunk.js",
    publicPath: '/public/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
