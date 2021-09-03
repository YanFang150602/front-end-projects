const math = function () {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(i);
  }
  console.log(arr.join('   '));
  return $('#root').html();
}
module.exports = {math};
