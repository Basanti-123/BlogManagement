var assert = require('assert');
var toProperUpper = require('../index.js');

suite('Proper Upper', function() {

  test('all lowercase', function(done) {
    var ugly = 'bill murray';
    var gold = 'Bill Murray';
    var pretty = toProperUpper(ugly);

    assert.equal(pretty, gold, 'String should be formatted properly.');

    done();
  });

  test('all uppercase', function(done) {
    var ugly = 'BILL MURRAY';
    var gold = 'Bill Murray';
    var pretty = toProperUpper(ugly);

    assert.equal(pretty, gold, 'String should be formatted properly.');

    done();
  });

  test('random case', function(done) {
    var ugly = 'biLl mUrRAY';
    var gold = 'Bill Murray';
    var pretty = toProperUpper(ugly);

    assert.equal(pretty, gold, 'String should be formatted properly.');

    done();
  });

  test('hyphened words', function(done) {
      var ugly = "sir francis-smiTh-yOrkshire";
      var gold = "Sir Francis-Smith-Yorkshire";
      var pretty = toProperUpper(ugly, '-');

      assert.equal(pretty, gold, 'String should be formatted properly.');

      done();
    });

  test('apostrophed words', function(done) {
    var ugly = "chips o'toule";
    var gold = "Chips O'Toule";
    var pretty = toProperUpper(ugly, "'");

    assert.equal(pretty, gold, 'String should be formatted properly.');

    done();
  });

  test('hyphened and apostrophed words', function(done) {
    var ugly = "francis-smiTh-yOrkshire o'toule";
    var gold = "Francis-Smith-Yorkshire O'Toule";
    var pretty = toProperUpper(ugly, ["-", "'"]);

    assert.equal(pretty, gold, 'String should be formatted properly.');

    done();
  });
});