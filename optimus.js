'use strict';

(function() {

  var MAX_INT32 = 1125899906842623;

  var root = this;
  var prevOptimus = root.Optimus;

  var has_require = typeof require !== 'undefined'
  var Long; 
  
  if(root.dcodeIO && root.dcodeIO.Long) {
   Long = root.dcodeIO.Long;
  }
  
  if(typeof Long === 'undefined') {
    if(has_require) {
      Long = require('long');
    } else {
      throw new Error('Optimus requires long js see https://github.com/dcodeIO/long.js');
    }
  }

  var Optimus = function(prime, inverse, random) {
    this.prime = Long.fromNumber(prime);
    this.inverse = Long.fromNumber(inverse);
    this.random = Long.fromNumber(random);
  };

  Optimus.prototype.encode = function(num) {
    var n = Long.fromNumber(num);
    return n.mul(this.prime).and(Long.fromNumber(MAX_INT32)).xor(this.random).toSigned().toNumber();
  };

  Optimus.prototype.decode = function(num) {
    var n = Long.fromNumber(num);
    return n.xor(this.random).mul(this.inverse).and(Long.fromNumber(MAX_INT32)).toSigned().toNumber();
  };

  Optimus.noConflict = function() {
    root.Optimus = prevOptimus;
    return Optimus;
  }

  if( typeof exports !== 'undefined' ) {
    if( typeof module !== 'undefined' && module.exports ) {
      exports = module.exports = Optimus;
    }
    exports.mymodule = Optimus;
  } 
  else {
    root.Optimus = Optimus;
  }

}).call(this);
