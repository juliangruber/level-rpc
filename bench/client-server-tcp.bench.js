var Client = require('../client');
var Server = require('../server');
var net = require('net');
var bench = require('./util');

var server = new Server(__dirname + '/db');
var db = new Client();

var tcpServer = net.createServer(function (stream) {
  stream.pipe(server.createStream()).pipe(stream);
});

tcpServer.listen(8999, function () {
  var con = net.connect(8999);
  con.pipe(db.createRPCStream()).pipe(con);

  bench(10000, db, function () {
    tcpServer.close();
    con.end();
  });
});

