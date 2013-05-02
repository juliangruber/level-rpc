var stringify = require('../stringify');
var stringifyBuf = stringify.buffer;
var Buffer = require('buffer').Buffer;
var test = require('tape');

test('stringify str: get', function (t) {
  var buf = stringify(13, 'get', 'key');

  t.equals(buf.readUInt32LE(0), 13, 'id');
  t.equals(buf.readUInt8(4), 0, 'method');
  t.equals(buf.readUInt8(5), 3, 'key length');
  t.equals(buf.toString('utf8', 6, 9), 'key', 'key');
  t.equals(buf.length, 9, 'msg length');

  t.end();
});

test('stringify buf: get', function (t) {
  var buf = stringifyBuf(13, 'key', new Buffer('key'));

  t.equals(buf.readUInt32LE(0), 13, 'id');
  t.equals(buf.readUInt8(4), 0, 'method');
  t.equals(buf.readUInt8(5), 3, 'key length');
  t.equals(buf.toString('utf8', 6, 9), 'key', 'key');
  t.equals(buf.length, 9, 'msg length');

  t.end();
});

test('stringify str: put', function (t) {
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

test('stringify buf: put', function (t) {
  var buf = stringifyBuf(13, 'put', new Buffer('key'), new Buffer('value'));

  t.equals(buf.readUInt32LE(0), 13, 'id');
  t.equals(buf.readUInt8(4), 1, 'method');
  t.equals(buf.readUInt8(5), 3, 'key length');
  t.equals(buf.toString('utf8', 6, 9), 'key', 'key');
  t.equals(buf.readUInt8(9), 5, 'value length');
  t.equals(buf.toString('utf8', 10, 15), 'value', 'value');
  t.equals(buf.length, 15, 'msg length');

  t.end();
});
