var stringify = require('../stringify');
var ben = require('ben');

var ms = ben(30000, function () {
  stringify(10, 13, ['foo'])
});

console.log('get %s ops/s', Math.round(1000/ms));

ms = ben(30000, function () {
  stringify(20, 13, ['foo', 'bar'])
});

console.log('put %s ops/s', Math.round(1000/ms));
