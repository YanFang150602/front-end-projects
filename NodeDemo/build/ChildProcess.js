// IPC 通道
// parent.js
const path = require('path');
const cp = require('child_process');

console.log(path.resolve(__dirname, './child.js'));
console.log('parent running');

// fork方法，返回一个ChildProcess实例
const child = cp.fork(path.resolve(__dirname, './child.js'));
child.on('message', function(m){
    console.log('message from child: ' + JSON.stringify(m));
});
// TypeError: Cannot read property 'on' of null
// child.stdout.on('data', function(data) {
//   console.log('Success to receive child process 3.');
// });
child.send({from: 'parent'});

// spwan方法，返回一个ChildProcess实例（创建个坏的）
const child2 = cp.spawn('bad_command');
child2.on('error', (err) => {
  console.log('Failed to start child process 2.');
});

// 开启一个新的cmd窗口（原窗口不变）执行npm run mock 并传递参数port=3002
const child3 = cp.spawn('start', ['cmd','/K', 'npm', 'run', 'server:better', '--', 'port=4002'], { shell: true });
child3.stdout.on('data', function(data) {
    console.log('Failed to start child process 3.');
});
child3.stderr.on('data', data => {
    console.log('Error msg from process 3: ' + data);
});
child3.on('error', (err) => {
  console.log('Failed to start child process 3.');
});

// execFile方法
cp.execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log('version: ', stdout); // v12.18.0
});

// exec方法
cp.exec('dir', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行出错: ${error}`);
    return;
  }
  console.log(`exec stdout: ${stdout}`);
  console.log(`exec stderr: ${stderr}`);
});

console.log('parent send over');
