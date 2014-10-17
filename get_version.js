var registry = require('npm-stats')();
var async = require('async');

var coreModules = [
  'zetta',
  'zetta-device',
  'zetta-scout',
  'zetta-rels',
  'zetta-scientist',
  'zetta-streams'
];

var cache = {};

module.exports = function(module, callback) {
  if (cache[module]) {
    setImmediate(callback.bind(null, null, cache[module]));
    return;
  }

  registry.module(module).info(function(err, info) {
    if (err) {
      return callback(err);
    }
    cache[module] = info['dist-tags'].latest;
    return callback(null, cache[module]);
  });
};
