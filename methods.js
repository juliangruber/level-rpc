var methods = {
  get : 1,
  put : 2,
  del : 3
}

Object.keys(methods).forEach(function (method) {
  methods[methods[method]] = method;
});

module.exports = methods;
