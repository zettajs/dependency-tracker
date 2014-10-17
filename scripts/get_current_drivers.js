var registry = require('npm-stats')();

registry.module('zetta-device').dependents(function(err, info) {
  console.log(info)
});

