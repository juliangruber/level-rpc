var test = require('tape');
var parse = require('../parse');
var stringify = require('../stringify');

test('parse', function (t) {
  var parser = parse();

  var i = 0;
  parser.on('data', function (data) {
    if (i++ == 0) {
      t.equal(data[0], 10, 'method');
      t.equal(data[1], 13, 'id');
      t.deepEqual(data[2], ['foo']);
    } else {
      t.equal(data[0], 20, 'method');
      t.equal(data[1], 13, 'id');
      t.deepEqual(data[2], ['foo', 'bar']);

      t.end();
    }
  });

  parser.write(stringify(10, 13, ['foo']));
  parser.write(stringify(20, 13, ['foo', 'bar']));
  parser.end();
});
