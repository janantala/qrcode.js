var QRMode = require("./QRMode.js");

//---------------------------------------------------------------------
// ALPHA_NUM
//---------------------------------------------------------------------

function ALPHA_NUM(data) {
  this.mode = QRMode.MODE_ALPHA_NUM;
  this.data = data;
}

ALPHA_NUM.prototype.getCode = function(code) {
  var codes = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
  var index = codes.indexOf(code);
  if (index < 0) {
    throw new Error("Invalid character: `" + code + "`");
  }
  return index;
};

ALPHA_NUM.prototype.getLength = function(buffer) {
  return this.data.length;
};

ALPHA_NUM.prototype.write = function(buffer) {
  for (var i = 0; i < this.data.length; i++) {
    if (this.data[i + 1]) {
      buffer.put((45 * this.getCode(this.data[i])) + this.getCode(this.data[i + 1]), 11);
    } else {
      buffer.put(this.getCode(this.data[i]), 6);
    }
    i++;
  }
};

module.exports = ALPHA_NUM;
