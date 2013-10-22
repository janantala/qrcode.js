/* global global, __dirname */
var path = require("path");

var testSourceBase = path.resolve(path.join(__dirname, "..", "src"));

global.resolveSource = function(file) {
  "use strict";

  return path.join(testSourceBase, file);
};
