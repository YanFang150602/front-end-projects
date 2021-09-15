# 项目准备

```shell
mkdir webpackdemo
cd webpackdemo
npm init -y
```

# 验证ProvidePlugin

1、安装jquery：

```shell
npm install jquery -S
```

2、build\webpack.config.js文件里引入ProvidePlugin：

```js
webpackConfig.plugins.push(
  new webpack.ProvidePlugin({
    $: 'jquery'
  })
);
```

3、src\main.js直接使用jquery（不需要import）：

```js
$('#root').append('<div style="color: red">hello main</div>');
```

4、src\index.js直接使用jquery（不需要import）：

```js
$('#root').append('<div style="color: red">hello index</div>');
```

5、编译效果：

```shell
Hash: 8e0b36136d7b4ea8c7c7
Version: webpack 4.46.0
Time: 498ms
Built at: 2021-09-03 5:33:31 ├F10: PM┤
                        Asset       Size  Chunks                         Chunk Names
index.8e0b36136d7b4ea8c7c7.js    324 KiB   index  [emitted] [immutable]  index
                   index.html  202 bytes          [emitted]
 main.8e0b36136d7b4ea8c7c7.js    324 KiB    main  [emitted] [immutable]  main
Entrypoint index = index.8e0b36136d7b4ea8c7c7.js
Entrypoint main = main.8e0b36136d7b4ea8c7c7.js
# 将index、main里引入的jquery分别引入到各自编译后的文件里（未提取出来）
[./node_modules/jquery/dist/jquery.js] 282 KiB {index} {main} [built]
[./src/index.js] 127 bytes {index} [built]
[./src/main.js] 126 bytes {main} [built]
Child HtmlWebpackCompiler:
                          Asset      Size               Chunks  Chunk Names
    __child-HtmlWebpackPlugin_0  4.45 KiB  HtmlWebpackPlugin_0  HtmlWebpackPlugin_0
    Entrypoint HtmlWebpackPlugin_0 = __child-HtmlWebpackPlugin_0
    [./node_modules/html-webpack-plugin/lib/loader.js!./src/index.html] 343 bytes {HtmlWebpackPlugin_0} [built]
```
js里虽不用import jquery，但编译时，会自动引入jquery(不能完全实现代码分割)

# 验证SplitChunksPlugin

SplitChunksPlugin 插件可以将**公共的依赖模块（多个模块引入相同的模块）**提取到已有的 entry chunk 中，或者提取到一个新生成的 chunk。

src\main.js 和src\index.js里都引入了jquery和src\js\math.js两个公共模块

```js
webpackConfig.optimization.splitChunks = {
  chunks: 'all'
};
```

```shell
PS D:\workbook\webpackdemo> npm run build

> webpackdemo@1.0.0 build D:\workbook\webpackdemo
> webpack --config build/webpack.config.js --mode development

Hash: a8d2c52d378a87161a92
Version: webpack 4.46.0
Time: 500ms
Built at: 2021-09-03 5:04:47 ├F10: PM┤
                                     Asset       Size              Chunks                         Chunk Names
             index.a8d2c52d378a87161a92.js   7.44 KiB               index  [emitted] [immutable]  index
                                index.html  268 bytes                      [emitted]
              main.a8d2c52d378a87161a92.js   7.44 KiB                main  [emitted] [immutable]  main
vendors~index~main.a8d2c52d378a87161a92.js    319 KiB  vendors~index~main  [emitted] [immutable]  vendors~index~main
Entrypoint index = vendors~index~main.a8d2c52d378a87161a92.js index.a8d2c52d378a87161a92.js
Entrypoint main = vendors~index~main.a8d2c52d378a87161a92.js main.a8d2c52d378a87161a92.js
# 将index、main里引入的jquery提取到一个新生成的chunk里了
[./node_modules/jquery/dist/jquery.js] 282 KiB {vendors~index~main} [built]
[./src/index.js] 127 bytes {index} [built]
# 将index、main里引入的src\js\math.js分别引入到各自编译后的文件里（未提取出来）
# 因为splitChunks.minSize默认值不是0，要想src\js\math.js也提取出来，可以修改minSize值
[./src/js/math.js] 193 bytes {index} {main} [built]
[./src/main.js] 126 bytes {main} [built]
Child HtmlWebpackCompiler:
                          Asset      Size               Chunks  Chunk Names
    __child-HtmlWebpackPlugin_0  4.45 KiB  HtmlWebpackPlugin_0  HtmlWebpackPlugin_0
    Entrypoint HtmlWebpackPlugin_0 = __child-HtmlWebpackPlugin_0
    [./node_modules/html-webpack-plugin/lib/loader.js!./src/index.html] 343 bytes {HtmlWebpackPlugin_0} [built]
PS D:\workbook\webpackdemo>
```

```js
webpackConfig.optimization.splitChunks = {
  chunks: 'all',
  minSize: 0,
};
```

```shell
PS D:\workbook\webpackdemo> npm run build

> webpackdemo@1.0.0 build D:\workbook\webpackdemo
> webpack --config build/webpack.config.js --mode development

Hash: a38340bec140aeeda731
Version: webpack 4.46.0
Time: 499ms
Built at: 2021-09-03 5:11:24 ├F10: PM┤
                                     Asset       Size              Chunks                         Chunk Names
             index.a38340bec140aeeda731.js   6.83 KiB               index  [emitted] [immutable]  index
                                index.html  326 bytes                      [emitted]
        index~main.a38340bec140aeeda731.js  723 bytes          index~main  [emitted] [immutable]  index~main
              main.a38340bec140aeeda731.js   6.82 KiB                main  [emitted] [immutable]  main
vendors~index~main.a38340bec140aeeda731.js    319 KiB  vendors~index~main  [emitted] [immutable]  vendors~index~main
Entrypoint index = vendors~index~main.a38340bec140aeeda731.js index~main.a38340bec140aeeda731.js index.a38340bec140aeeda731.js
Entrypoint main = vendors~index~main.a38340bec140aeeda731.js index~main.a38340bec140aeeda731.js main.a38340bec140aeeda731.js
# 将index、main里引入的jquery提取到一个新生成的chunk里了
[./node_modules/jquery/dist/jquery.js] 282 KiB {vendors~index~main} [built]
[./src/index.js] 127 bytes {index} [built]
# 也将index、main里引入的src\js\math.js提取到一个新生成的chunk里了
[./src/js/math.js] 193 bytes {index~main} [built]
[./src/main.js] 126 bytes {main} [built]
Child HtmlWebpackCompiler:
                          Asset      Size               Chunks  Chunk Names
    __child-HtmlWebpackPlugin_0  4.45 KiB  HtmlWebpackPlugin_0  HtmlWebpackPlugin_0
    Entrypoint HtmlWebpackPlugin_0 = __child-HtmlWebpackPlugin_0
    [./node_modules/html-webpack-plugin/lib/loader.js!./src/index.html] 343 bytes {HtmlWebpackPlugin_0} [built]
PS D:\workbook\webpackdemo>
```

# Tree Shaking

依赖于 ES2015 模块语法的 静态结构 特性，例如 import 和 export！

## usedExports

```js
webpackConfig.mode = 'development';
webpackConfig.optimization = {
  usedExports: true
}
```

不会删除掉未被引用的export，只是在编译后的文件里加个注释`/* unused harmony export testReg */`！！！

## sideEffects

```js
webpackConfig.mode = 'production';
```

```json
{
  "sideEffects": ["*.css", "*.less"]
}
```

删除掉未被引用的export！！！

# 动态导入

entry.js

```js
import(/* webpackChunkName: "CTest" */'./component/Test').then((module) => {
  module.default();
});
```

component/Test.js

```js
export default function Test() {
  console.log('test.......test....test......');
}
```

编译后的结果：

```shell
PS D:\workbook\webpackdemo> npm run build

> webpackdemo@1.0.0 build D:\workbook\webpackdemo
> better-npm-run build

running better-npm-run in D:\workbook\webpackdemo
Executing script: build

to be executed: "npm run clean & webpack --config build/webpack.config.js --mode development"

> webpackdemo@1.0.0 clean D:\workbook\webpackdemo
> rimraf dist

Hash: c0fe73585ccc817de0a7
Version: webpack 4.46.0
Time: 2267ms
Built at: 2021-09-15 9:26:51 ├F10: AM┤
                                     Asset       Size              Chunks                         Chunk Names
             CTest.c0fe73585ccc817de0a7.js  668 bytes               CTest  [emitted] [immutable]  CTest
             entry.c0fe73585ccc817de0a7.js   1.67 KiB               entry  [emitted] [immutable]  entry
             index.c0fe73585ccc817de0a7.js   2.68 KiB               index  [emitted] [immutable]  index
                                index.html  376 bytes                      [emitted]
              main.c0fe73585ccc817de0a7.js   2.29 KiB                main  [emitted] [immutable]  main
           runtime.c0fe73585ccc817de0a7.js   36.3 KiB             runtime  [emitted] [immutable]  runtime
vendors~index~main.c0fe73585ccc817de0a7.js    870 KiB  vendors~index~main  [emitted] [immutable]  vendors~index~main
Entrypoint index = runtime.c0fe73585ccc817de0a7.js vendors~index~main.c0fe73585ccc817de0a7.js index.c0fe73585ccc817de0a7.js
Entrypoint main = runtime.c0fe73585ccc817de0a7.js vendors~index~main.c0fe73585ccc817de0a7.js main.c0fe73585ccc817de0a7.js
Entrypoint entry = runtime.c0fe73585ccc817de0a7.js entry.c0fe73585ccc817de0a7.js
[./node_modules/jquery/dist/jquery.js] 282 KiB {vendors~index~main} [built]
[./node_modules/lodash/lodash.js] 531 KiB {vendors~index~main} [built]
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {vendors~index~main} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {vendors~index~main} [built]
# 动态导入：根据webpackChunkName: CTest生成对应的chunk
[./src/component/Test.js] 82 bytes {CTest} [built]
[./src/entry.js] 166 bytes {entry} [built]
[./src/index.js] 758 bytes {index} [built]
[./src/js/children.js] 277 bytes {index} {main} [built]
[./src/js/component.js] 312 bytes {entry} [built]
[./src/js/math.js] 199 bytes {index} {main} [built]
[./src/main.js] 375 bytes {main} [built]
Child HtmlWebpackCompiler:
                          Asset      Size               Chunks  Chunk Names
    __child-HtmlWebpackPlugin_0  4.47 KiB  HtmlWebpackPlugin_0  HtmlWebpackPlugin_0
    Entrypoint HtmlWebpackPlugin_0 = __child-HtmlWebpackPlugin_0
    [./node_modules/html-webpack-plugin/lib/loader.js!./src/index.html] 343 bytes {HtmlWebpackPlugin_0} [built]
PS D:\workbook\webpackdemo>
```

# bundle 分析

1、安装webpack-bundle-analyzer插件：

```shell
npm install webpack-bundle-analyzer -D
```

2、build/webpack.config.js里添加webpack-bundle-analyzer插件：

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

webpackConfig.plugins.push(new BundleAnalyzerPlugin());
```

3、`npm run build`编译结果：

```shell
PS D:\workbook\webpackdemo> npm run build

> webpackdemo@1.0.0 build D:\workbook\webpackdemo
> better-npm-run build

running better-npm-run in D:\workbook\webpackdemo
Executing script: build

to be executed: "npm run clean & webpack --config build/webpack.config.js --mode development"

> webpackdemo@1.0.0 clean D:\workbook\webpackdemo
> rimraf dist

Webpack Bundle Analyzer is started at http://127.0.0.1:8888
Use Ctrl+C to close it
Hash: 641bbb11c781c9ebec32
Version: webpack 4.46.0
Time: 2421ms
Built at: 2021-09-15 4:59:57 ├F10: PM┤
                                           Asset       Size                    Chunks                         Chunk Names
                   CTest.641bbb11c781c9ebec32.js   5.08 KiB                     CTest  [emitted] [immutable]  CTest
                   entry.641bbb11c781c9ebec32.js   1.74 KiB                     entry  [emitted] [immutable]  entry
                   index.641bbb11c781c9ebec32.js    322 KiB                     index  [emitted] [immutable]  index
                                      index.html  382 bytes                            [emitted]
                    main.641bbb11c781c9ebec32.js    321 KiB                      main  [emitted] [immutable]  main
                 runtime.641bbb11c781c9ebec32.js   36.3 KiB                   runtime  [emitted] [immutable]  runtime
vendors~CTest~index~main.641bbb11c781c9ebec32.js    551 KiB  vendors~CTest~index~main  [emitted] [immutable]  vendors~CTest~index~main
Entrypoint index = runtime.641bbb11c781c9ebec32.js vendors~CTest~index~main.641bbb11c781c9ebec32.js index.641bbb11c781c9ebec32.js
Entrypoint main = runtime.641bbb11c781c9ebec32.js vendors~CTest~index~main.641bbb11c781c9ebec32.js main.641bbb11c781c9ebec32.js
Entrypoint entry = runtime.641bbb11c781c9ebec32.js entry.641bbb11c781c9ebec32.js
[./node_modules/jquery/dist/jquery.js] 282 KiB {index} {main} [built]
[./node_modules/lodash/lodash.js] 531 KiB {vendors~CTest~index~main} [built]
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {vendors~CTest~index~main} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {vendors~CTest~index~main} [built]
[./src/3rd/webpack-numbers.js] 2.94 KiB {CTest} [built]
[./src/component/Test.js] 161 bytes {CTest} [built]
[./src/entry.js] 166 bytes {entry} [built]
[./src/index.js] 758 bytes {index} [built]
[./src/js/children.js] 277 bytes {index} {main} [built]
[./src/js/component.js] 312 bytes {entry} [built]
[./src/js/math.js] 199 bytes {index} {main} [built]
[./src/main.js] 375 bytes {main} [built]
Child HtmlWebpackCompiler:
                          Asset      Size               Chunks  Chunk Names
    __child-HtmlWebpackPlugin_0  4.47 KiB  HtmlWebpackPlugin_0  HtmlWebpackPlugin_0
    Entrypoint HtmlWebpackPlugin_0 = __child-HtmlWebpackPlugin_0
    [./node_modules/html-webpack-plugin/lib/loader.js!./src/index.html] 343 bytes {HtmlWebpackPlugin_0} [built]

# 浏览器会自动打开http://127.0.0.1:8888/，显示webpack bundle分析
```

4、避免执行`npm run build`命令时自动打开浏览器，参考下面操作：

```js
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// webpackConfig.plugins.push(new BundleAnalyzerPlugin());
```

```json
{
  "script": {
    "stat": "webpack --config build/webpack.config.js --json > stats.json",
    "analyzer": "webpack-bundle-analyzer stats.json"
  },
}
```

由`npm run stat`命令记录编译信息数据；

由`npm run analyzer`命令打开分析页面。

# 引用library

将WebpackLibraryDemo打的webpack-numbers.js存放到src/3rd目录里。

1、修改build/webpack.config.js

```js
webpackConfig.resolve = {
  extensions: ['.js'],
  alias: {
    '@3rd': path.resolve(__dirname, '../src/3rd')
  }
};
webpackConfig.optimization.splitChunks = {
  chunks: 'all',
  maxInitialRequests: 3,
  minSize: 0,
};
webpackConfig.plugins.push(
  new webpack.ProvidePlugin({
    $: 'jquery',
    _: 'lodash'
  })
);
```

2、修改src/component/Test.js

```js
import { numToWord } from '@3rd/webpack-numbers';

export default function Test() {
  console.log('test.......test....test......');
  console.log(numToWord(0));
}
```


