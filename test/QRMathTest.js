/* global describe, it, global */
var expect = require("expect.js");

var QRMath = require(global.resolveSource("QRMath.js"));

describe("QRMath", function() {
  "use strict";

  describe("glog", function() {
    it("should return 1 for 2", function() {
      var result = QRMath.glog(2);

      expect(result).to.be(1);
    });

    it("should return 53 for 40", function() {
      var result = QRMath.glog(40);

      expect(result).to.be(53);
    });

  });
});
