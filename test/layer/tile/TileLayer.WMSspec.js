/*global describe, it, beforeEach, expect, happen, createMap */
describe('L.TileLayer.WMS bgbuffer', function() {
  var map, tileLayer;

  beforeEach(function() {
    var container = document.createElement('div');
    document.body.appendChild(container);

    map = L.map(container).setView([0, 0], 12);
    tileLayer = new L.TileLayer.WMS('fake/wms', {
      maxZoom: 19
    }).addTo(map);
  });

  it('it shoud have _animated forced', function() {
    expect(tileLayer._animated).toBe(true);
  });

  it('puts tiles in background buffer on reset', function() {
    var bgbuffer = tileLayer._bgBuffer;
    tileLayer.setParams({
      format: 'image/png'
    });
    expect(tileLayer._tileContainer).toEqual(bgbuffer);
  });

});
