var test = require('tape');
var Client = require('../client');
var Server = require('../server');

test('integration', function (t) {
  var server = new Server(__dirname + '/db');
  var db = new Client();

  var dbStream = db.createRPCStream();
  dbStream.pipe(server.createStream()).pipe(dbStream);

  db.put('foo', 'bar', function (err) {
    t.error(err);
    db.get('foo', function (err, val) {
      t.error(err);
      t.equal(val, 'bar');
      t.end();
    })
  })
});
