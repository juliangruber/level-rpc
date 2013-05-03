
# level-rpc

Super fast rpc mechanism for LevelUp

[![Build Status](https://travis-ci.org/juliangruber/level-rpc.png?branch=master)](https://travis-ci.org/juliangruber/level-rpc)

[![browser support](https://ci.testling.com/juliangruber/level-rpc.png)](https://ci.testling.com/juliangruber/level-rpc)

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
* `[ ]` `db#del(key, cb)`
* `[ ]` `db#batch(opts, cb)`
* `[ ]` `db#create*Stream()`
* `[ ]` `db#approximateSize()`

## Motivation

[multilevel](https://github.com/juliangruber/multilevel) is nice but slow and doesn't support binary data. Instead of going after feature parity first this module is all about speed and binary support, feature parity with [levelup](https://github.com/rvagg/node-levelup) will come later.

## Protocol

```
| METHOD | CB ID | FIELDCOUNT | F1LENGTH | F1 | ...
```

`METHOD = {METHOD}{EVENT}`, e.g. `10` for `{GET}{REQUEST}`.

### Examples

`GET` request:

```
| 10    | CB ID  | 1     | KEYLENGTH | KEY  |
| UINT8 | UINT32 | UINT8 | UINT8     | UTF8 |
```

`GET` response:

```
| 11    | CB ID  | 2     | ERRLENGTH | ERR  | VALUELENGTH | VALUE |
| UINT8 | UINT32 | UINT8 | UINT8     | UTF8 | UINT8       | UTF8  |
```

`PUT` request:

```
| 20    | CB ID  | 2     | KEYLENGTH | KEY  | VALUELENGTH | VALUE |
| UINT8 | UINT32 | UINT8 | UINT8     | UTF8 | UINT8       | UTF8  |
```

`PUT` response:

```
| 21    | CB ID  | 1     | ERRLENGTH | ERR  |
| UINT8 | UINT32 | UINT8 | UINT8     | UTF8 |
```



## Benchmarks

```bash
 ∴  bench (master) : node stringify.bench.js 
stringify str:     get x 816,181 ops/sec ±0.39% (96 runs sampled)
stringify new buf: get x 548,044 ops/sec ±0.58% (94 runs sampled)
stringify old buf: get x 1,353,637 ops/sec ±0.45% (87 runs sampled)

stringify str:     put x 596,660 ops/sec ±0.38% (93 runs sampled)
stringify new buf: put x 338,863 ops/sec ±0.35% (96 runs sampled)
stringify old buf: put x 1,157,951 ops/sec ±0.51% (95 runs sampled)
```

```bash
 ∴  bench (master) : node parse.bench.js 
parse: get x 1,979,999 ops/sec ±0.31% (94 runs sampled)
parse: put x 1,315,728 ops/sec ±0.33% (83 runs sampled)
```
