var Client = require('../client');
var Server = require('../server');
var net = require('net');
var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

var server = new Server(__dirname + '/db');
var db = new Client();

var tcpServer = net.createServer(function (stream) {
  stream.pipe(server.createStream()).pipe(stream);
});

tcpServer.listen(8999, function () {
  var con = net.connect(8999);
  con.pipe(db.createRPCStream()).pipe(con);

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
    .on('complete', function () {
      con.end();
      tcpServer.close();
    })
    .run({ async : true });
});

