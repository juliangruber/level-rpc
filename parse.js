var through = require('through');
var Buffer = require('buffer').Buffer;

module.exports = parse;

function parse () {
  var buf = null;
  var offset = 0;

  var method, id, fieldCount, fieldLength, field, fields;

  function reset () {
    method = null;
    id = null;
    fieldCount = null;
    fieldLength = null;
    field = null;
    fields = [];
  }

  reset();

  return through(function (chunk) {
    var len = chunk.length;

    if (buf) {
      chunk = Buffer.concat(buf, chunk);
      buf = null;
    }

    while (true) {
      if (method === null) {
        if (len < 1 + offset) break;
        method = chunk.readUInt8(offset);
        offset += 1;
      }

      if (id === null) {
        if (len < 4 + offset) break;
        id = chunk.readUInt32LE(offset);
        offset += 4;
      }

      if (fieldCount === null) {
        if (len < 1 + offset) break;
        fieldCount = chunk.readUInt8(offset);
        offset += 1;
      }

      while (fields.length < fieldCount) {
        if (fieldLength === null) {
          if (len < 1 + offset) break;
          fieldLength = chunk.readUInt8(offset);
          offset += 1;
        }

        if (fieldLength === 0) {
          fields.push(undefined);
          fieldLength = null;
          field = null;
          continue;
        }

        if (field === null) {
          if (len < fieldLength + offset) break;
          var fieldEnd = fieldLength + offset;
          field = chunk.toString('utf8', offset, fieldEnd);
          offset = fieldEnd;
          fields.push(field);
          fieldLength = null;
          field = null;
        }
      }

      this.queue([method, id, fields]);

      reset();
    }

    if (len != offset) {
      var dif = Math.abs(len - offset)
      buf = chunk.slice(len - dif);
    }

    offset = 0;
  });
}
