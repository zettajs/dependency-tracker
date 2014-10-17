var assert = require('assert');
var check = require('../check');

function errorText(versions) {
  var text = '';
  Object.keys(versions).forEach(function(k) {
    text += k + '(' + versions[k].latest + ')' + ' is not met with ' + versions[k].dep + '\n';
  });

  return text;
}

describe('Drivers', function() {

var drivers = [ 'zetta',
  'zetta-ardrone-driver',
  'zetta-buzzer-bonescript-driver',
  'zetta-http-device',
  'zetta-hue-driver',
  'zetta-jsmpeg-camera',
  'zetta-led-bonescript-driver',
  'zetta-microphone-bonescript-driver',
  'zetta-mock-heartbeat-sensor',
  'zetta-mock-led',
  'zetta-pir-bonescript-driver',
  'zetta-rgb-bonescript-driver',
  'zetta-sine-wave',
  'zetta-sonos-driver',
  'zetta-spreadsheet-google-driver',
  'zetta-twilio-driver',
  'zetta-wemo-driver' ];

  drivers.forEach(function(driver) {
    describe(driver, function() {
      
      it('should have latest zetta-device', function(done) {
        check(driver, 'zetta-device', function(err, test, versions) {
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

    });
  });

});
