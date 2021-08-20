const path = require('path');
const webpack = require('webpack');
const { library } = require('./vendor');

module.exports = (env, args) => ({
  devtool: args.mode === 'production' ? 'inline-source-map' : 'source-map',
  entry: {
    ...library
  },
  output: {
    path: path.resolve(__dirname, '../static/website/dll'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../static/website/dll/[name].manifest.json'),
      name: '[name]',
    })
  ]
});
