const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
  entry: {
    index: './src/index.js',
    main: './src/main.js'
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
};
webpackConfig.optimization = {};
webpackConfig.optimization.splitChunks = {
  chunks: 'all',
  minSize: 0,
};
webpackConfig.plugins = [];
webpackConfig.plugins.push(
  new webpack.ProvidePlugin({
    $: 'jquery'
  })
);
webpackConfig.plugins.push(
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../src/index.html'),
    filename: 'index.html',
  })
);
module.exports = webpackConfig;
