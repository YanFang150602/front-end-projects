# 项目准备

```shell
mkdir NodeDemo
cd NodeDemo
npm init -y
```

# 安装

```shell
npm install debug -D
npm install nodemon -D
npm install better-npm-run -D
```

# 项目源码

## package.json

```json
{
  "name": "NodeDemo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "server": "node build/server.js",
    "server:better": "better-npm-run server",
    "server:debug": "better-npm-run debug"
  },
  "betterScripts": {
    "server": {
      "command": "nodemon build/server",
      "env": {
        "DEBUG": "log:*"
      }
    },
    "debug": "set DEBUG=log:* & nodemon build/server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "better-npm-run": "^0.1.1",
    "debug": "^4.3.2",
    "nodemon": "^2.0.12"
  }
}
```

## build\server.js

```js
const log = require('debug')('log:run'); // 引入debug模块并创建debug实例
const http = require('http'); // 引入http模块用于构造http服务器
const name = 'My App';

// 启用debug实例
// log.enabled = true; 配合npm run server执行
log('params: ', process.argv);
log('booting server: %o', name); // 调用debug输出(printf风格输出--详见util.inspect及console模块)

http.createServer(function(req, res) { // 创建服务器
  log(req.method + ' ' + req.url); // 收到请求时打印http方法及url
  res.end('hello\n');
}).listen(3000, function() {
  log('http://localhost:3000'); // 开启服务器监听时打印listening
});
```
