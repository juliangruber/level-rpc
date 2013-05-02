var stringify = require('../stringify');
var stringifyBuf = stringify.buffer;
var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

var key = new Buffer('foo');
var value = new Buffer('bar');

suite
  .add('stringify str: get', function () {
    stringify(13, 'get', 'foo')
  })
  .add('stringify str: put', function () {
    stringify(13, 'put', 'foo', 'bar')
  })
  .add('stringify new buf: get', function () {
    stringifyBuf(13, 'get', new Buffer('foo'));
  })
  .add('stringify new buf: put', function () {
    stringifyBuf(13, 'put', new Buffer('foo'), new Buffer('bar'));
  })
  .add('stringify old buf: get', function () {
    stringifyBuf(13, 'get', key);
  })
  .add('stringify old buf: put', function () {
    stringifyBuf(13, 'put', key, value);
  })
  .on('cycle', function (ev) {
    console.log(String(ev.target));
  })
  .run({ async : true });
