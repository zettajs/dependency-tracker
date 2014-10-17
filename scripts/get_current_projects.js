var registry = require('npm-stats')();

registry.module('zetta').dependents(function(err, info) {
  console.log(info)
});

