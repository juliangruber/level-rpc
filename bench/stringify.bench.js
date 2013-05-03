var stringify = require('../stringify');
var stringifyBuf = stringify.buffer;
var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

suite
  .add('stringify str: get', function () {
    stringify(10, 13, ['foo'])
  })
  .add('stringify str: put', function () {
    stringify(20, 13, ['foo', 'bar'])
  })
  .on('cycle', function (ev) {
    console.log(String(ev.target));
  })
  .run({ async : true });
