var stringify = require('../stringify');
var stringifyBuf = stringify.buffer;
var Buffer = require('buffer').Buffer;
var test = require('tape');

test('stringify', function (t) {
  var buf = stringify(10, 13, [undefined, 'key', 'value']);

  // ME : ID : FC : L1 : F1  : L2 : F2
  // 10 : 13 : 02 : 03 : key : 05 : value

  t.equals(buf.readUInt8(0), 10, 'method');
  t.equals(buf.readUInt32LE(1), 13, 'id');
  t.equals(buf.readUInt8(5), 3, 'field count');
  t.equals(buf.readUInt8(6), 0, 'undefined length');
  t.equals(buf.readUInt8(7), 3, 'key length');
  t.equals(buf.toString('utf8', 8, 11), 'key', 'key');
  t.equals(buf.readUInt8(11), 5, 'value length');
  t.equals(buf.toString('utf8', 12, 17), 'value', 'value');
  t.equals(buf.length, 17, 'msg length');

  t.end();
});
