const path = require( 'path' );
const webpack = require( 'webpack' );
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Set different CSS extraction for editor only and common block styles
const blocksCSSPlugin = new MiniCssExtractPlugin( {
  filename: './assets/css/blocks.style.css',
} );
const editBlocksCSSPlugin = new MiniCssExtractPlugin( {
  filename: './assets/css/blocks.editor.css',
} );

module.exports = {
  entry: {
    './assets/js/editor.blocks' : './blocks/index.js',
    './assets/js/frontend.blocks' : './blocks/frontend.js',
  },
  output: {
    path: path.resolve( __dirname ),
    filename: '[name].js',
  },
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /style\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /editor\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    blocksCSSPlugin,
    editBlocksCSSPlugin,
  ],
};
