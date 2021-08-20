const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { library } = require('./vendor');

module.exports = (env, args) => ({
  devtool: args.mode === 'development' ? 'source-map' : 'inline-source-map',
  entry: {
    main: './src/main',
    // index: './src/index',
    index: './src/index2'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  output: {
    path: path.resolve(__dirname, '../static/website/js'),
    filename: '[name].js',
    publicPath: '/website/js'
  },
  externals: {
    jquery: '$',
    lodash: '_',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(c|sa|sc)ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass')
            }
          }
        ]
      },
      {
        test: /\.(png|gif|jpg|svg)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'public/index.html'),
      title: 'react ts demo',
      filename: '../index.html' // 相对output/path目录
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname,'../node_modules/jquery/dist/jquery.min.js'),
        to: path.resolve(__dirname,'../static/website/3rdJS/jquery.min.js')
      },
      {
        from: './node_modules/lodash/lodash.min.js',
        to: '../3rdJs',
      },
      {
        from: './public/images/',
        to: '../images',
      }
    ]),
    ...Object.keys(library).map(key => {
      return new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, `../static/website/dll/${key}.manifest.json`)
      })
    })
  ],
  devServer: {
    https: true,
    contentBase: path.resolve(__dirname, '../static/'),
    compress: true,
    port: 8080,
    open: true,
    hot: true,
    hotOnly: true,
    publicPath: '/',
  },
  stats: {
    modules: false,
    cached: true, 
    cachedAssets: true,
    timings: true, //增加时间信息
    maxModules: 60
  }
});
