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
    clearBufferTimeout: 1000,
    redrawBuffer: true
  });

  L.TileLayer.WMS.include({

    /**
     * Smooth redraw, put tiles into the backbuffer, then
     * refill the empty tile container with the new ones in front
     */
    redraw: function() {
      var useBuffer = this.options.redrawBuffer;
      if (this._map) {
        if (useBuffer) {
          this._oldTiles = this._tiles;
          this._tiles = {};
        }
        this._removeAllTiles();
        this._update();
      }

      if (useBuffer) {
        this.once('load', function() {
          setTimeout(L.Util.bind(function() {
            for (var key in this._oldTiles) {
              L.DomUtil.remove(this._oldTiles[key].el);
            }
            this._oldTiles = {};
          }, this), this.options.clearBufferTimeout);
        }, this);
      }

      return this;
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
