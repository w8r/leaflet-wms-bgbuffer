/*global describe, it, beforeEach, expect, happen, createMap */
describe('L.TileLayer.WMS bgbuffer', function() {
  var map, tileLayer;

  beforeEach(function() {
    var container = document.createElement('div');
    map = L.map(container);
    tileLayer = L.tileLayer('{x},{y},{z}', {
      minZoom: 0,
      maxZoom: 19
    }).addTo(map);
  });

  it('it should have tests', function() {
    expect(map.hasLayer(tileLayer)).toBe(true);
  });

});
