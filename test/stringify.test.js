var stringify = require('../stringify');
var test = require('tape');

test('stringify: get', function (t) {
  var buf = stringify(13, 'get', 'key');

  t.equals(buf.readUInt32LE(0), 13, 'id');
  t.equals(buf.readUInt8(4), 0, 'method');
  t.equals(buf.readUInt8(5), 3, 'key length');
  t.equals(buf.toString('utf8', 6, 9), 'key', 'key');
  t.equals(buf.length, 9, 'msg length');

  t.end();
});

test('stringify: put', function (t) {
  var buf = stringify(13, 'put', 'key', 'value');

  t.equals(buf.readUInt32LE(0), 13, 'id');
  t.equals(buf.readUInt8(4), 1, 'method');
  t.equals(buf.readUInt8(5), 3, 'key length');
  t.equals(buf.toString('utf8', 6, 9), 'key', 'key');
  t.equals(buf.readUInt8(9), 5, 'value length');
  t.equals(buf.toString('utf8', 10, 15), 'value', 'value');
  t.equals(buf.length, 15, 'msg length');

  t.end();
});
