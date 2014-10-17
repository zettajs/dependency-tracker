var assert = require('assert');
var check = require('../check');

function errorText(versions) {
  var text = '';
  Object.keys(versions).forEach(function(k) {
    text += k + '(' + versions[k].latest + ')' + ' is not met with ' + versions[k].dep + '\n';
  });

  return text;
}

describe('Projects', function() {

  var projects = [
    'zettajs/zetta-hello-world',
    'zettajs/zetta-starter-project',
    'zettajs/zetta-security-system',
    'zettajs/zetta-cloud-bluemix-sample',
    'zettajs/zetta-cloud-bluemix-sample',
    'zettajs/zetta-j5-sample',
    'zettajs/zetta-cloud-sample',
    'zettajs/robotics-demo'
  ];

  projects.forEach(function(driver) {
    describe(driver, function() {
      
      it('should have latest zetta', function(done) {
        check(driver, 'zetta', function(err, test, versions) {
          if (err) {
            return done(err);
          }
          
          assert.equal(test, true, errorText(versions));
          done();
        });
      });

      it('should have latest zetta-scout', function(done) {
        check(driver, 'zetta-scout', function(err, test, versions) {
          if (err) {
            return done(err);
          }
          
          assert.equal(test, true, errorText(versions));
          done();
        });
      });

      it('should have latest zetta-device', function(done) {
        check(driver, 'zetta-device', function(err, test, versions) {
          if (err) {
            return done(err);
          }
          
          assert.equal(test, true, errorText(versions));
          done();
        });
      });


    });
  });

});
