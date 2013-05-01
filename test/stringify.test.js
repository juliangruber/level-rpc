var stringify = require('../stringify');
var test = require('tape');

test('stringify: get', function (t) {
  var buf = stringify(13, 'get', 'key');

  t.equals(buf.readUInt32LE(0), 13, 'id');
  t.equals(buf.readUInt8(3), 0, 'method');
  t.equals(buf.readUInt8(4), 3, 'key length');
  t.equals(buf.toString('utf8', 5, 8), 'key', 'key');
  t.equals(buf.length, 8, 'msg length');

  t.end();
});

test('stringify: put', function (t) {
  var buf = stringify(13, 'put', 'key', 'value');

  t.equals(buf.readUInt32LE(0), 13, 'id');
  t.equals(buf.readUInt8(3), 1, 'method');
  t.equals(buf.readUInt8(4), 3, 'key length');
  t.equals(buf.toString('utf8', 5, 8), 'key', 'key');
  t.equals(buf.readUInt8(8), 5, 'value length');
  t.equals(buf.toString('utf8', 9, 14), 'value', 'value');
  t.equals(buf.length, 14, 'msg length');

  t.end();
});
