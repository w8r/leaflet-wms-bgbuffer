/*global describe, it, beforeEach, expect, happen, createMap */
describe('L.TileLayer.WMS bgbuffer', function() {
  var map, tileLayer;
  var originalTimeout;

  beforeEach(function() {
    var container = document.createElement('div');
    document.body.appendChild(container);

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    map = L.map(container).setView([0, 0], 12);
    tileLayer = new L.TileLayer.WMS('fake/wms', {
      maxZoom: 19
    }).addTo(map);
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('puts tiles in background buffer on reset', function() {
    var tiles = tileLayer._tiles;
    tileLayer.setParams({
      format: 'image/png'
    });
    expect(tileLayer._oldTiles).toEqual(tiles);
  });

  it('cleans DOM after itself', function(done) {

    tileLayer.setParams({
      format: 'image/png'
    });

    setTimeout(function() {
      var numTiles = 0;
      for (var key in tileLayer._oldTiles) numTiles++;
      expect(numTiles).toEqual(0);
      done();
    }, tileLayer.options.clearBufferTimeout + 300);

  });

});
