var parse = require('../parse');
var stringify = require('../stringify');
var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

var parser = new parse();

var get = stringify(10, 13, ['foo']);
var put = stringify(20, 13, ['foo', 'bar']);

suite
  .add('get', function () {
    parser.write(get);
  })
  .add('put', function () {
    parser.write(put);
  })
  .on('cycle', function (ev) {
    console.log(String(ev.target));
  })
  .run({ async : true });
