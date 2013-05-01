module.exports = stringify;

/**
 * Create Buffer to be sent over the wire.
 */

function stringify (method, key, value) {
  var keyLength = key.length;
  var valueLength = value.length;

  var length = 2 + keyLength;

  if (method === 'put') {
    length += 1 + valueLength
  }

  var buf = new Buffer(length);

  buf.writeUInt8(method == 'put');
  buf.writeUInt8(keyLength, 1);
  buf.write(key, 2);

  if (method === 'put') {
    buf.writeUInt8(valueLength, 2 + keyLength);
    buf.write(value, 2 + keyLength + 1);
  }

  return buf;
}
