var async = require('async');
var getVersion = require('./get_version');

var coreModules = [
  'zetta',
  'zetta-device',
  'zetta-scout',
  'zetta-rels',
  'zetta-scientist',
  'zetta-streams'
];

module.exports = function(callback) {
  var versions = {};
  async.forEach(coreModules, function(module, next) {
    getVersion(module, function(err, version) {
      if (err) {
        return next(err);
      }
      versions[module] = version;
      next();
    });
  }, function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, versions);
  });
}
