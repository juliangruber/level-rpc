var through = require('through');

module.exports = parse;

function parse () {
  var buf = null;
  var offset = 0;

  var id, method, keyLength, key, valueLength, value;

  function reset () {
    id = null;
    method = null;
    keyLength = null;
    key = null;
    valueLength = null;
    value = null;
  }

  reset();

  return through(function (chunk) {
    var len = chunk.length;

    if (buf) {
      chunk = Buffer.concat(buf, chunk);
      buf = null;
    }

    while (true) {
      if (id === null) {
        if (len < 4 + offset) break;
        id = chunk.readUInt32LE(offset);
        offset += 4;
      }

      if (method === null) {
        if (len < 1 + offset) break;
        method = chunk.readUInt8(offset) == 0
          ? 'get'
          : 'put';
        offset += 1;
      }

      if (keyLength === null) {
        if (len < 1 + offset) break;
        keyLength = chunk.readUInt8(offset);
        offset += 1;
      }

      if (key === null) {
        if (len < keyLength + offset) break;
        var keyEnd = keyLength + offset;
        key = chunk.toString('utf8', offset, keyEnd);
        offset = keyEnd;
      }

      if (valueLength === null && method === 'put') {
        if (len < 1 + offset) break;
        valueLength = chunk.readUInt8(offset);
        offset += 1;
      }

      if (value === null && method === 'put') {
        if (len < valueLength + offset) break;
        var valueEnd = valueLength + offset;
        value = chunk.toString('utf8', offset, valueEnd);
        offset = valueEnd;
      }

      this.queue([id, method, key, value]);

      reset();
    }

    if (len != offset) {
      var dif = Math.abs(len - offset)
      buf = new Buffer(dif)
      chunk.copy(buf, 0, len - dif)
    }

    offset = 0;
  });
}
