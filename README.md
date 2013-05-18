# level-rpc

**This module is DEPRECATED. Just use [multilevel](https://github.com/juliangruber/multilevel), it's nearly as fast and supports binary data.**

Super fast rpc mechanism for LevelUp

[![Build Status](https://travis-ci.org/juliangruber/level-rpc.png?branch=master)](https://travis-ci.org/juliangruber/level-rpc)

[![browser support](https://ci.testling.com/juliangruber/level-rpc.png)](https://ci.testling.com/juliangruber/level-rpc)

## Usage

Fire up a server:

```js
var net = require('net');
var Server = require('level-rpc').Server;

var server = new Server('/tmp/db');

net.createServer(function (con) {
  con.pipe(server.createStream()).pipe(con);
}).listen(8999);
```

And connect to it from a client:

```js
var net = require('net');
var Client = require('level-rpc').Client;

var db = new Client();

var rpcStream = db.createRPCStream();
rpcStream.pipe(net.connect(8999)).pipe(rpcStream);

db.put('foo', 'bar', function (err) {
  if (err) throw err;
  
  db.get('foo', function (err, value) {
    if (err) throw err;
    console.log(value);
    // => bar
  })
});
```

## Status

* `[X]` stringify
* `[X]` parse
* `[X]` string encoding
* `[ ]` buffer encoding
* `[X]` rpc server
* `[X]` rpc client
* `[ ]` reconnection logic
* `[X]` `db#get(key, cb)`
* `[X]` `db#put(key, value, cb)`
* `[X]` `db#del(key, cb)`
* `[ ]` `db#batch(opts, cb)`
* `[ ]` `db#create*Stream()`
* `[ ]` `db#approximateSize()`

## Motivation

[multilevel](https://github.com/juliangruber/multilevel) is nice but slow and doesn't support binary data. Instead of going after feature parity first this module is all about speed and binary support, feature parity with [levelup](https://github.com/rvagg/node-levelup) will come later.

## Protocol

```
| METHOD | CB ID | FIELDCOUNT | F1LENGTH | F1 | ...
```

### Examples

`GET` request:

```
| 1     | CB ID  | 1     | KEYLENGTH | KEY  |
| UINT8 | UINT32 | UINT8 | UINT8     | UTF8 |
```

`GET` response:

```
| 0     | CB ID  | 2     | ERRLENGTH | ERR  | VALUELENGTH | VALUE |
| UINT8 | UINT32 | UINT8 | UINT8     | UTF8 | UINT8       | UTF8  |
```

`PUT` request:

```
| 2     | CB ID  | 2     | KEYLENGTH | KEY  | VALUELENGTH | VALUE |
| UINT8 | UINT32 | UINT8 | UINT8     | UTF8 | UINT8       | UTF8  |
```

`PUT` response:

```
| 0     | CB ID  | 1     | ERRLENGTH | ERR  |
| UINT8 | UINT32 | UINT8 | UINT8     | UTF8 |
```

## Benchmarks

```bash
 ∴  level-rpc (master) : node bench/
client-server-local.bench.js (1/5)
put 26502 ops/s
get 25773 ops/s

client-server-tcp.bench.js (2/5)
put 9268 ops/s
get 9497 ops/s

levelup.bench.js (3/5)
put 51282 ops/s
get 64516 ops/s

parse.bench.js (4/5)
get 1153846 ops/s
put 1153846 ops/s

stringify.bench.js (5/5)
get 681818 ops/s
put 566038 ops/s
```
