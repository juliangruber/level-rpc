var ben = require('ben');

module.exports = bench;

/**
 * Benchmark utility.
 *
 * @param {Number=} count
 * @param {DB} db
 * @param {Function=} cb
 */

function bench (count, db, cb) {
  if (typeof count != 'number') {
    cb = db;
    db = count;
    count = 30000;
  }

  ben.async(count, function (done) { db.put('foo', 'bar', done) }, function (ms) {
    console.log('put %s ops/s', Math.round(1000/ms));

    ben.async(count, function (done) { db.get('foo', done) }, function (ms) {
      console.log('get %s ops/s', Math.round(1000/ms));
      if (cb) cb();
    });
  });
}
