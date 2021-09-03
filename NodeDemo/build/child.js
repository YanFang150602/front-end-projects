// child.js
console.log('child running');
process.on('message', function(m){
  console.log('message from parent: ' + JSON.stringify(m));
});

process.send({from: 'child'});

console.log('child send over');
