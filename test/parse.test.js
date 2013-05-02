var test = require('tape');
var parse = require('../parse');
var stringify = require('../stringify');

test('parse', function (t) {
  var parser = parse();

  var i = 0;
  parser.on('data', function (data) {
    if (i++ == 0) {
      t.equal(data[0], 13, 'id');
      t.equal(data[1], 'get', 'method');
      t.equal(data[2], 'foo');
      t.equal(data[3], null, 'value');
    } else {
      t.equal(data[0], 13, 'id');
      t.equal(data[1], 'put', 'method');
      t.equal(data[2], 'foo');
      t.equal(data[3], 'bar');

      t.end();
    }
  });

  parser.write(stringify(13, 'get', 'foo'));
  parser.write(stringify(13, 'put', 'foo', 'bar'));
  parser.end();
});
