var levelup = require('levelup');
var duplex = require('duplexer');
var through = require('through');

var parse = require('./parse');
var stringify = require('./stringify');
var methods = require('./methods');
var events = require('./events');

module.exports = Server;

/**
 * Server.
 */

function Server (location) {
  this.db = levelup(location);
}

Server.prototype.createStream = function () {
  var db = this.db;

  var parser = parse();
  var out = through();
  var stream = duplex(parse, out);
  
  parse.on('data', function (op) {
    var method = op[0];
    var id = op[1];
    var args = op[2];

    if (method == 10) { // GET
      args.push(function cb (err) {
        out.write(stringify(
          11,
          id,
          [err? err.toString() || '']
        ));
      });
      db.get.apply(db, args);
    }
  })
    
  return stream;
}
