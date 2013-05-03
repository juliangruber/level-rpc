var test = require('tape');
var parse = require('../parse');
var stringify = require('../stringify');

test('parse', function (t) {
  var parser = parse();

  parser.on('data', function (data) {
    t.equal(data[0], 20, 'method');
    t.equal(data[1], 13, 'id');
    t.deepEqual(data[2], [undefined, 'foo', 'bar']);

    t.end();
  });

  parser.write(stringify(20, 13, [undefined, 'foo', 'bar']));
  parser.end();
});
