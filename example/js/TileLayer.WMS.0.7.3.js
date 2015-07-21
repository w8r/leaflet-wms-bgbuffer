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

  L.TileLayer.WMS.mergeOptions({
    redrawBuffer: true
  });

  L.TileLayer.WMS.include({

    /**
     * Smooth redraw, put tiles into the backbuffer, then
     * refill the empty tile container with the new ones in front
     */
    redraw: function() {
      if (this._map) {
        if (this.options.redrawBuffer) {
          var front = this._tileContainer;

          this._clearBgBuffer();
          this._tileContainer = this._bgBuffer;
          this._bgBuffer = front;
          this._tiles = {};
          this._tilesToLoad = 0;
          this._tilesTotal = 0;
        } else {
          this._reset({
            hard: true
          });
        }

        this._update();
      }
      return this;
    },

    /**
     * Override for old IE, just to have bg buffer for tiles
     */
    _initContainer: function() {
      this._animated = this._animated || this.options.redrawBuffer;
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
