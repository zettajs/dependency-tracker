var semver = require('semver');
var core = require('./core_versions');
var getDep = require('./get_dep');
var async = require('async');

module.exports = function(module, dep, callback) {
  core(function(err, coreVersions) {
    if(err) {
      return callback(err);
    }
    
    var deps = dep;
    if (!Array.isArray(dep)) {
      deps = [dep];
    }
    delete dep;
    
    var test = true;
    var versions = {};
    async.forEach(deps, function(dep, next) {
      getDep(module, dep, function(err, version) {
        if(err) {
          return next(err);
        }

        // does not have dep
        if (version === undefined) {
          return next();
        }

        if (!semver.satisfies(coreVersions[dep], version)) {
          test = false;
          versions[dep] = {latest: coreVersions[dep], dep: version};
        }

        next();
      });

    }, function(err) {
      if (err) {
        return callback(err);
      }
      
      callback(null, test, versions);
    });
  });
};
