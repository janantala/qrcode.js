var QRMode = require("./QRMode.js");

//---------------------------------------------------------------------
// NUMBER
//---------------------------------------------------------------------

function NUMBER(data) {
  this.mode = QRMode.MODE_NUMBER;
  this.data = data;
}

NUMBER.prototype.getCode = function(chars) {
  var index = parseInt(chars, 10);
  if (isNaN(index)) {
    throw new Error("Invalid character: `" + chars + "`");
  }
  return index;
};

NUMBER.prototype.getBitLen = function(length) {
  var NUMBER_LENGTH = {
    3: 10,
    2: 7,
    1: 4
  };
  return NUMBER_LENGTH[length];
};

NUMBER.prototype.getLength = function(buffer) {
  return this.data.length;
};

NUMBER.prototype.write = function(buffer) {
  for (var i = 0; i < this.data.length; i++) {

    var chars = this.data[i];
    if (this.data[i + 1]) {
      chars += this.data[i + 1];
    }
    if (this.data[i + 2]) {
      chars += this.data[i + 2];
    }

    var bitLength = this.getBitLen(chars.length);
    buffer.put(this.getCode(chars), bitLength);

    i++;
    i++;
  }
};

module.exports = NUMBER;
