```shell
npm install jquery lodash -S
```

```js
module.exports = {
  externals: {
    jquery: 'JQuery',
    lodash: '_',
  },
  stats: {
    modules: false,
    cached: true, 
    cachedAssets: true,
    timings: true, //增加时间信息
    maxModules: 60
  },
}
```

从node_modules里copy出jquery.min.js、lodash.min.js --使用copy-webpack-html插件从node_modules里拷贝出来
在public/index.html里引入jquery、lodash

output:
path: path.resolve(__dirname, '../dist') => path: path.resolve(__dirname, '../static/dist')
devServer:
contentBase: path.resolve(__dirname, '../dist') => path.resolve(__dirname, '../static/dist')
