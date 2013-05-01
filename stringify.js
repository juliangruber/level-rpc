module.exports = stringify;

/**
 * Create Buffer to be sent over the wire.
 */

function stringify (id, method, key, value) {
  var keyLength = key.length;
  var valueLength = value.length;

  // 5 = method + 3x callback id + key length
  var length = 5 + keyLength;

  if (method === 'put') {
    length += 1 + valueLength
  }

  var buf = new Buffer(length);

  buf.writeUInt32LE(id);
  buf.writeUInt8(method == 'put', 3);
  buf.writeUInt8(keyLength, 4);
  buf.write(key, 5);

  if (method === 'put') {
    buf.writeUInt8(valueLength, 5 + keyLength);
    buf.write(value, 5 + keyLength + 1);
  }

  return buf;
}
