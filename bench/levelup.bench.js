var levelup = require('levelup');
var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

levelup(__dirname + '/db', function (err, db) {
  if (err) throw err;

  suite
    /*.add('get', function (done) {
      process.db.get('foo', done);
    })*/
    .add('put', function (done) {
      db.put('foo', 'bar', done);
    })
    .on('cycle', function (ev) {
      if (ev.target.error) throw ev.target.error;
      console.log(String(ev.target));
    })
    .on('complete', function () {
      db.close();
    })
    .run({ async : true });
});
