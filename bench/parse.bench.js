var parse = require('../parse');
var stringify = require('../stringify');
var ben = require('ben');

var parser = new parse();

var get = stringify(10, 13, ['foo']);
var put = stringify(20, 13, ['foo', 'bar']);

var ms = ben(30000, function () {
  parser.write(get);
});

console.log('get %s ops/s', Math.round(1000/ms));

ms = ben(30000, function () {
  parser.write(put);
});

console.log('put %s ops/s', Math.round(1000/ms));
