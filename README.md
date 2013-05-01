
# level-rpc

[![Build Status](https://travis-ci.org/juliangruber/level-rpc.png?branch=master)](https://travis-ci.org/juliangruber/level-rpc)

## Protocol

```
| METHOD | CALLBACK ID | KEY LENGTH | KEY    | (VALUE LENGTH) | (Value) |
| GET=0  | UINT32      | UINT8      | UTF8   | UINT8          | UTF8    |
| PUT=1  |             |            |        |                |         |
```