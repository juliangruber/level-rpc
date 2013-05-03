var Buffer = require('buffer').Buffer;

module.exports = stringify;

/**
 * Create Buffer to be sent over the wire.
 */

function stringify (method, id, fields) {
  // 6 = method + 4x callback + fieldCount
  var length = 6;
  var offset = 0;

  for (var i = 0; i < fields.length; i++) {
    // 1 = fieldlength
    length += 1 + fields[i].length;
  }

  var buf = new Buffer(length);

  buf.writeUInt8(method, 0); offset += 1;
  buf.writeUInt32LE(id, 1); offset += 4;
  buf.writeUInt8(fields.length, 5); offset += 1;

  for (var i = 0; i < fields.length; i++) {
    buf.writeUInt8(fields[i].length, offset); offset += 1;
    buf.write(fields[i], offset); offset += fields[i].length;
  }

  return buf;
};
