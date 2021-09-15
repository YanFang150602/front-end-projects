# 创建library

webpack.config.js

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js',
    library: 'webpackNumbers',
    libraryTarget: 'umd'
    /* 
    webpack@5
    library: {
      name: 'webpackNumbers',
      type: 'umd'
    } */
  },
  externals: {
    // lodash不要打入webpack-numbers.js文件里，下面的写法涉及lodash的引用方式
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    }
    // lodash: '_' 此方式会导致引用webpack-number.js时报_未定义
  }
};
```
