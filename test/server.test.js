var test = require('tape');
var Server = require('../server');
var stringify = require('../stringify');

test('server put', function (t) {
  var server = new Server(__dirname + '/db');
  var stream = server.createStream();
 
  stream.on('data', function (chunk) {
    t.equals(chunk.toString(), stringify(0, 0, []).toString());
    server.db.close();
    t.end();
  });

  stream.write(stringify(2, 0, ['foo', 'bar']));
});

test('server get', function (t) {
  var server = new Server(__dirname + '/db');
  var stream = server.createStream();
 
  stream.on('data', function (chunk) {
    t.equals(chunk.toString(), stringify(0, 0, [undefined, 'bar']).toString());
    t.end();
  });

  stream.write(stringify(1, 0, ['foo']));
});
