var levelup = require('levelup');
var bench = require('./util');

levelup(__dirname + '/db', function (err, db) {
  if (err) throw err;

  bench(db, db.close.bind(db));
});
