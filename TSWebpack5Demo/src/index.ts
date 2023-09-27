import Home from './component/Class';
import Enum from './component/Enum';


let s:string = 'test';
console.log(s);

const home = new Home('谨防诈骗！！！');
console.log(home.ads);
home.changeAdsContent('诈骗防不胜防，多长个心眼！！！');

console.log(Enum);
