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
  this.nextId = 0;
}

inherits(Client, EventEmitter);

Client.prototype.createRPCStream = function () {
  var self = this;

  var parser = parse();
  var out = through();
  var stream = duplex(parser, out);

  parser.on('data', function (op) {
    var id = op[1];
    var args = op[2];
    self.callbacks[id].apply(null, args);
    delete self.callbacks[id];
  });

  self.on('op', function (method, cb, args) {
    out.write(stringify(methods[method], self.nextId, args));
    self.callbacks[self.nextId] = cb;
    self.nextId++;
  });

  return stream;
}

Client.prototype.get = function (key, cb) {
  if (!cb) cb = function () {};
  this.emit('op', 'get', cb, [key]);
}

Client.prototype.put = function (key, value, cb) {
  if (!cb) cb = function () {};
  this.emit('op', 'put', cb, [key, value]);
}
