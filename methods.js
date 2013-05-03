var methods = {
  get : 1,
  put : 2
}

Object.keys(methods).forEach(function (method) {
  methods[methods[method]] = method;
});

module.exports = methods;
