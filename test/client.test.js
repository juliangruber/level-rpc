var test = require('tape');
var Client = require('../client');
var stringify = require('../stringify');

test('client get', function (t) {
  t.plan(3);

  var db = new Client();
  var rpcStream = db.createRPCStream();
  
  rpcStream.on('data', function (chunk) {
    t.equals(chunk.toString(), stringify(1, 0, ['foo']).toString(), 'out');
    rpcStream.write(stringify(0, 0, [undefined, 'bar']));
  });

  db.get('foo', function (err, value) {
    t.error(err, 'no error');
    t.equals(value, 'bar', 'string');
  });
});

test('client put', function (t) {
  t.plan(2);

  var db = new Client();
  var rpcStream = db.createRPCStream();
  
  rpcStream.on('data', function (chunk) {
    t.equals(
      chunk.toString(),
      stringify(2, 0, ['foo', 'bar']).toString(),
      'out'
    );
    rpcStream.write(stringify(0, 0, []));
  });

  db.put('foo', 'bar', function (err) {
    t.error(err, 'no error');
  });
});

test('client del', function (t) {
  t.plan(2);

  var db = new Client();
  var rpcStream = db.createRPCStream();
  
  rpcStream.on('data', function (chunk) {
    t.equals(
      chunk.toString(),
      stringify(3, 0, ['foo']).toString(),
      'out'
    );
    rpcStream.write(stringify(0, 0, []));
  });

  db.del('foo', function (err) {
    t.error(err, 'no error');
  });
});
