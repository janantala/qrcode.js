# qrcode.js v1.0.0

QR code generator, supports Alphanumeric and Binary inputMode up to lvl 40.

# Usage

#### Create QR code
```
var qr = new QRCode(typeNumber, correction, inputMode);
qr.addData(text);
qr.make();
```

#### Get module count
```
var modules = qr.getModuleCount();
```

#### Get tile color
```
for (var row = 0; row < modules; row++) {
  for (var col = 0; col < modules; col++) {
    var color = qr.isDark(row, col) ? '#000' : '#fff';
    ...
  }
}
```

## type number
- supported are all levels **1-40**
- use **0** for the lowest complexity

## correction 
- Integer **1** - Level L (Low)
- Integer **0** - Level M (Medium)
- Integer **3** - Level Q (Quartile)
- Integer **2** - Level H (High)

## input mode 
- `NUMBER`
- `ALPHA_NUM`
- `8bit` (default)

# Reference
Kazuhiko Arase, http://www.d-project.com/

# License

The MIT License

Copyright (c) 2013 Jan Antala, http://janantala.com
