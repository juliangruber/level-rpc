var Client = require('../client');
var Server = require('../server');

var ben = require('ben');
function bench (db, cb) {
  ben.async(30000, function (done) { db.put('foo', 'bar', done) }, function (ms) {
    console.log('put %s ops/s', 1000/ms);

    ben.async(300000, function (done) { db.get('foo', done) }, function (ms) {
      console.log('get %s ops/s', 1000/ms);
      if (cb) cb();
    });
  });
}

var server = new Server(__dirname + '/db');
var db = new Client();
var dbStream = db.createRPCStream();
dbStream.pipe(server.createStream()).pipe(dbStream);

bench(db);
