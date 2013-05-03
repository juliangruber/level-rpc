var Client = require('../client');
var Server = require('../server');
var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

var server = new Server(__dirname + '/db');
var db = new Client();
var dbStream = db.createRPCStream();
dbStream.pipe(server.createStream()).pipe(dbStream);

suite
  .add('put', function (done) {
    db.put('foo', 'bar', done);
  })
  .add('get', function (done) {
    db.get('foo', done);
  })
  .on('cycle', function (ev) {
    console.log(String(ev.target));
  })
  .run({ async : true });
