import Home from './component/Home';

let s:string = 'test';
console.log(s);

const home = new Home('谨防诈骗！！！');
console.log(home.ads);
home.changeAdsContent('诈骗防不胜防，多长个心眼！！！');
