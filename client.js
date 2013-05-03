var duplex = require('duplexer');
var through = require('through');
var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;

var stringify = require('./stringify');
var parse = require('./parse');
var methods = require('./methods');

module.exports = Client;

/**
 * Client.
 */

function Client () {
  EventEmitter.call(this);
  this.callbacks = {};
  this.nextId = 1;
}

inherits(Client, EventEmitter);

Client.prototype.createRPCStream = function () {
  var self = this;

  var parser = parse();
  var out = through();
  var stream = duplex(parser, out);

  parser.on('data', function (op) {
    var id = op[1];
    if (id === 0) return;
    var args = op[2];
    self.callbacks[id].apply(null, args);
    delete self.callbacks[id];
  });

  self.on('op', function (method, cb, args) {
    var cbId = 0;

    if (cb) {
      cbId = self.nextId;
      self.callbacks[cbId] = cb;
      self.nextId++;
    }

    out.write(stringify(methods[method], cbId, args));
  });

  return stream;
}

Client.prototype.get = function (key, cb) {
  this.emit('op', 'get', cb, [key]);
}

Client.prototype.put = function (key, value, cb) {
  this.emit('op', 'put', cb, [key, value]);
}

Client.prototype.del = function (key, cb) {
  this.emit('op', 'del', cb, [key]);
}
