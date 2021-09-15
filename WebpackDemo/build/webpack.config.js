const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackConfig = {
  entry: {
    index: './src/index.js',
    main: './src/main.js',
    entry: './src/entry.js',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
};
webpackConfig.resolve = {
  extensions: ['.js'],
  alias: {
    '@3rd': path.resolve(__dirname, '../src/3rd')
  }
};
webpackConfig.optimization = {
  runtimeChunk: 'single',
  usedExports: true,
};
webpackConfig.optimization.splitChunks = {
  chunks: 'all',
  maxInitialRequests: 3,
  minSize: 0,
};
webpackConfig.plugins = [];
webpackConfig.plugins.push(
  new webpack.ProvidePlugin({
    $: 'jquery',
    _: 'lodash'
  })
);
webpackConfig.plugins.push(
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../src/index.html'),
    filename: 'index.html',
  })
);
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
// webpackConfig.plugins.push(new BundleAnalyzerPlugin());
// webpackConfig.devtool = 'source-map';
webpackConfig.devServer = {
  static: './dist',
  port: '8081',
  hot: true,
  open: true,
};
webpackConfig.module = {
  rules: []
}
webpackConfig.module.rules.push({
  test: /\.js$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    options: {
      presets: [
        '@babel/preset-env'
      ],
    }
  }]
});
module.exports = webpackConfig;
