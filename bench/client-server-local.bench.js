var Client = require('../client');
var Server = require('../server');
var bench = require('./util');

var server = new Server(__dirname + '/db');
var db = new Client();
var dbStream = db.createRPCStream();
dbStream.pipe(server.createStream()).pipe(dbStream);

bench(db);
