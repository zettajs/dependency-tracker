var url = require('url');
var registry = require('npm-stats')();
var async = require('async');
var request = require('request');

var coreModules = [
  'zetta',
  'zetta-device',
  'zetta-scout',
  'zetta-rels',
  'zetta-scientist',
  'zetta-streams'
];

var cache = {};

module.exports = function(module, dep, callback) {
  if (cache[module] && cache[module][dep]) {
    setImmediate(callback.bind(null, null, cache[module][dep]));
    return;
  }
  cache[module] = {};

  var func = (module.indexOf('/') > -1) ? getFromGithub : getFromNpm;

  func(module, dep, function(err, version) {
    if (err) {
      return callback(err);
    }

    cache[module][dep] = version;
    callback(null, version);
  });
};


function getFromNpm(module, dep, callback) {
  registry.module(module).info(function(err, info) {
    if (err) {
      return callback(err);
    }
    
    var v = info['dist-tags'].latest;
    return callback(null, info.versions[v].dependencies[dep]);
  });
};

function getFromGithub(projectUrl, dep, callback) {
  var u = url.parse(projectUrl);
  
  request('https://raw.githubusercontent.com/' + u.pathname + '/master/package.json', function(err, res, data) {
    if (err) {
      return callback(err);
    }
    var json = JSON.parse(data);
    callback(null, json.dependencies[dep]);
  });
};


