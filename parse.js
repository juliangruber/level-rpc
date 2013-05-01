var through = require('through');

module.exports = parse;

function parse () {
  var buf = null;
  var offset = 0;

  var method, keyLength, key, valueLength, value;

  function reset () {
    method = null;
    offset = 0;
  }

  return through(function (chunk) {
    var len = chunk.length;

    if (buf) {
      chunk = Buffer.concat(buf, chunk);
      buf = null;
    }

    while (true) {
      if (!method) {
        if (len < 1 + offset) break;
        method = chunk.readUInt8(offset) == 0
          ? 'get'
          : 'put';
        offset += 1;
      }

      if (!keyLength) {
        if (len < 1 + offset) break;
        keyLength = chunk.readUInt8(offset);
        offset += 1;
      }

      if (!key) {
        if (len < keyLength + offset) break;
        var keyEnd = keyLength + offset;
        key = chunk.toString('utf8', offset, keyEnd);
        offset = keyEnd;
      }

      if (!valueLength && method === 'post') {
        if (len < 1 + offset) break;
        valueLength = chunk.readUInt8(offset);
        offset += 1;
      }

      if (!value && method === 'post') {
        if (len < valueLength + offset) break;
        var valueEnd = valueLength + offset;
        value = chunk.toString('utf8', offset, valueEnd);
        offset = valueEnd;
      }

      this.queue(method, key, value);

      reset();
    }

    if (len != offset) {
      var dif = Math.abs(len - offset)
      buf = new Buffer(dif)
      chunk.copy(buf, 0, len - dif)
    }
  });
}
