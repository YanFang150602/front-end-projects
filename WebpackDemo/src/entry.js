import {testJoin} from './js/component';
testJoin();
import(/* webpackChunkName: "CTest" */'./component/Test').then((module) => {
  module.default();
});
