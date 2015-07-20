## Leaflet.TileLayer.WMS with bgbuffer [![npm version](https://badge.fury.io/js/leaflet-wms-bgbuffer.svg)](http://badge.fury.io/js/leaflet-wms-bgbuffer) [![Bower version](https://badge.fury.io/bo/leaflet-wms-bgbuffer.svg)](http://badge.fury.io/bo/leaflet-wms-bgbuffer)

Plugin to enable background buffer in WMS layers to achieve smooth reloading
when changing the params

## [Demo](http://w8r.github.io/leaflet-wms-bgbuffer/example/)

## Usage

* npm

```bash
npm install --save leaflet-wms-bgbuffer
```

```js
require('leaflet-wms-bgbuffer');
```

or

```html
<script src="path/to/leaflet.js"></script>
<script src="dist/TileLayer.WMS.min.js"></script>
```

Then just work with the WMS layers.

There is an option to switch off the background buffers:

```js
var wms = new L.TileLayer.WMS('/url', { redrawBuffer: false });
```

## Dependencies

* Leaflet ^1.0.0

If you want to support Leaflet 0.7.3
```shell
npm install leaflet-wms-bgbuffer@0.7.3
```

## License

The MIT License (MIT)

Copyright (c) 2015 Alexander Milevski

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

