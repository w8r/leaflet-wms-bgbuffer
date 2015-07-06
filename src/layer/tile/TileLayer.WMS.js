(function(factory) {
  // Packaging/modules magic dance
  var L;
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['leaflet'], factory);
  } else if (typeof module !== 'undefined') {
    // Node/CommonJS
    L = require('leaflet');
    module.exports = factory(L);
  } else {
    // Browser globals
    if (typeof window.L === 'undefined') {
      throw new Error('Leaflet must be loaded first');
    }
    factory(window.L);
  }
}(function(L) {
  'use strict';


  L.TileLayer.WMS.include({

    /**
     * @param  {evision.gis.Map} map
     */
    onAdd: function(map) {
      this._crs = this.options.crs || map.options.crs;
      this._wmsVersion = parseFloat(this.wmsParams.version);

      var projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
      this.wmsParams[projectionKey] = this._crs.code;

      L.TileLayer.prototype.onAdd.call(this, map);
    },

    /**
     * Smooth redraw, put tiles into the backbuffer, then
     * refill the empty tile container with the new ones in front
     */
    redraw: function() {
      var front = this._tileContainer;

      this._clearBgBuffer();
      this._tileContainer = this._bgBuffer;
      this._bgBuffer = front;
      this._tiles = {};
      this._tilesToLoad = 0;
      this._tilesTotal = 0;

      this._update();
    },

    /**
     * Override for old ie to have bg buffer for tiles
     */
    _initContainer: function() {
      this._animated = true;
      L.TileLayer.prototype._initContainer.call(this);
    },

    /**
     * All image tiles are loaded
     * @return {Boolean}
     */
    tilesLoaded: function() {
      for (var id in this._tiles) {
        if (this._tiles.hasOwnProperty(id) && !this._tiles[id].complete) {
          return false;
        }
      }
      return true;
    }
  });

}));
