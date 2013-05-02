var parse = require('../parse');
var stringify = require('../stringify');
var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

var parser = new parse();

var get = stringify(13, 'get', 'foo');
var put = stringify(13, 'put', 'foo', 'bar');

suite
  .add('parse: get', function () {
    parser.write(get);
  })
  .add('parse: put', function () {
    parser.write(put);
  })
  .on('cycle', function (ev) {
    console.log(String(ev.target));
  })
  .run({ async : true });
