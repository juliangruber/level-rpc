var fs = require('fs');
var spawn = require('child_process').spawn;
var path = require('path');

var files = fs.readdirSync(__dirname).filter(function (name) {
  return !/(\.sw[a-z]|db|index\.js)$/.test(name);
});

(function next (i) {
  console.log('%s (%s/%s)', files[i], i + 1, files.length);
  var ps = spawn('node', [ path.join(__dirname, files[i]) ]);
  ps.stdout.pipe(process.stdout, { end : false });
  ps.stderr.pipe(process.stderr, { end : false });
  ps.on('exit', function () {
    console.log('');
    if (i + 1 < files.length) next(i + 1);
  });
})(0);
