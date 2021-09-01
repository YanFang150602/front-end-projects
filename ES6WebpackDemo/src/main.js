import echarts from 'echarts';
import {bar} from './js/bar';
import pie from './js/pie';

var myChart = echarts.init(document.getElementById('bar'), 'light');
myChart.setOption(bar);
myChart = echarts.init(document.getElementById('pie'), 'dark');
myChart.setOption(pie);
