# 2021-08-13
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
path: path.resolve(__dirname, '../dist') => path: path.resolve(__dirname, '../static/website/js')
devServer:
contentBase: path.resolve(__dirname, '../dist') => path.resolve(__dirname, '../static/')

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

遇到问题：
问题一：
控制台总报错：
jquery is not defined
externals "jquery"

lodash is not defined
externals "lodash"
解答一：
1、externals
module.exports = {
  externals: {
    jquery: ['jQuery'],
    lodash: ['lodash'],
  }
}
转为：
module.exports = {
  externals: {
    jquery: 'jQuery',
    lodash: 'lodash',
  }
}
2、index.html文件引入jquery、lodash需要在main、index之前使用。
