const log = require('debug')('log:run'); // 引入debug模块并创建debug实例
const http = require('http'); // 引入http模块用于构造http服务器
const name = 'My App';

// 启用debug实例
// log.enabled = true;
log('params: ', process.argv);
log('booting server: %o', name); // 调用debug输出(printf风格输出--详见util.inspect及console模块)

http.createServer(function(req, res) { // 创建服务器
  log(req.method + ' ' + req.url); // 收到请求时打印http方法及url
  res.end('hello\n');
}).listen(3000, function() {
  log('http://localhost:3000'); // 开启服务器监听时打印listening
});
