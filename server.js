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
  var stream = duplex(parser, out);
  
  parser.on('data', function (op) {
    var method = op[0];
    var id = op[1];
    var args = op[2];

    args.push(function cb () {
      var args = [].slice.call(arguments).map(function (arg) {
        if (arg !== null) return arg.toString();
      });
      out.write(stringify(0, id, args));
    });

    db[methods[method]].apply(db, args);
  })
    
  return stream;
}
