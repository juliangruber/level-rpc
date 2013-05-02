module.exports = stringify;

/**
 * Create Buffer to be sent over the wire.
 */

function stringify (id, method, key, value) {
  var keyLength = key.length;
  var valueLength;

  // 6 = method + 4x callback id + key length
  var length = 6 + keyLength;

  if (method == 'put') {
    valueLength = value.length;
    length += 1 + valueLength;
  }

  var buf = new Buffer(length);

  buf.writeUInt32LE(id, 0);
  buf.writeUInt8(method == 'put' ? 1 : 0, 4);
  buf.writeUInt8(keyLength, 5);
  buf.write(key, 6);

  if (method == 'put') {
    buf.writeUInt8(valueLength, 6 + keyLength);
    buf.write(value, 6 + keyLength + 1);
  }

  return buf;
};

stringify.buffer = function (id, method, key, value) {
  var keyLength = key.length;
  var valueLength;

  // 6 = method + 4x callback id + key length
  var length = 6 + keyLength;

  if (method == 'put') {
    valueLength = value.length;
    length += 1 + valueLength;
  }

  var buf = new Buffer(length);

  buf.writeUInt32LE(id, 0);
  buf.writeUInt8(method == 'put' ? 1 : 0, 4);
  buf.writeUInt8(keyLength, 5);
  key.copy(buf, 6);

  if (method == 'put') {
    buf.writeUInt8(valueLength, 6 + keyLength);
    value.copy(buf, 6 + keyLength + 1);
  }

  return buf;
};
