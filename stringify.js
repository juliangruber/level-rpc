module.exports = stringify;

/**
 * Create Buffer to be sent over the wire.
 */

function stringify (method, key, value) {
  var keyLength = key.length;
  var valueLength = value.length || 0;
  var buf = new Buffer(3 + keyLength + valueLength);

  buf.writeUInt8(method == 'put');
  buf.writeUInt8(keyLength, 1);
  buf.write(key);

  if (method === 'put') {
    buf.writeUInt8(valueLength, 2 + keyLength);
    buf.write(value);
  }

  return buf;
}
