# 项目准备

```shell
mkdir webpackdemo
cd webpackdemo
npm init -y
```

# 验证ProvidePlugin

安装jquery

```shell
npm install jquery -S
```

build\webpack.config.js

```js
webpackConfig.plugins.push(
  new webpack.ProvidePlugin({
    $: 'jquery'
  })
);
```

main.js

```js
$('#root').append('<div style="color: red">hello main</div>');
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
