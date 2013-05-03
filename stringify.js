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
    length += 1; // fieldlength
    if (typeof fields[i] !== 'undefined') length += fields[i].length;
  }

  var buf = new Buffer(length);

  buf.writeUInt8(method, 0); offset += 1;
  buf.writeUInt32LE(id, 1); offset += 4;
  buf.writeUInt8(fields.length, 5); offset += 1;

  for (var i = 0; i < fields.length; i++) {
    if (typeof fields[i] === 'undefined') {
      buf.writeUInt8(0, offset); offset += 1;
    } else {
      buf.writeUInt8(fields[i].length, offset); offset += 1;
      buf.write(fields[i], offset); offset += fields[i].length;
    }
  }

  return buf;
};
