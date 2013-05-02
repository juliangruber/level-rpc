
# level-rpc

Super fast rpc mechanism for LevelUp

[![Build Status](https://travis-ci.org/juliangruber/level-rpc.png?branch=master)](https://travis-ci.org/juliangruber/level-rpc)

## Status

* `[X]` stringify
* `[ ]` parse
* `[X]` string encoding
* `[ ]` buffer encoding
* `[ ]` rpc server
* `[ ]` rpc client
* `[ ]` `db#get(key, cb)`
* `[ ]` `db#put(key, value, cb)`
* `[ ]` `db#del(key, cb)`
* `[ ]` `db#create*Stream()`
* `[ ]` `db#approximateSize()`

## Motivation

[multilevel](https://github.com/juliangruber/multilevel) is nice but slow and doesn't support binary data. Instead of going after feature parity first this module is all about speed and binary support, feature parity with [levelup](https://github.com/rvagg/node-levelup) will come later.

## Protocol

```
| METHOD | CALLBACK ID | KEY LENGTH | KEY    | (VALUE LENGTH) | (Value) |
| GET=0  | UINT32      | UINT8      | UTF8   | UINT8          | UTF8    |
| PUT=1  |             |            |        |                |         |
```