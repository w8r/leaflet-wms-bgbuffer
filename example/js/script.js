"use strict";

var checkboxes = document.querySelectorAll('#legend input[type=checkbox]');
var url =
  'http://sampleserver1.arcgisonline.com/ArcGIS/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/WMSServer';

function getLayerSet() {
  var set = [];
  for (var i = 0, len = checkboxes.length; i < len; i++) {
    if (checkboxes[i].checked) set.push(checkboxes[i].name);
  }
  return set;
}

var map = L.map('map').setView([45, -93.2], 6);
var beforeMap = L.map('before').setView([45, -93.2], 6);

var wms = L.tileLayer.wms(
  url, {
    layers: getLayerSet(),
    transparent: true
  }).addTo(map);
var beforeWms = L.tileLayer.wms(
  url, {
    layers: getLayerSet(),
    transparent: true,
    redrawBuffer: false
  }).addTo(beforeMap);

for (var i = checkboxes.length - 1; i >= 0; i--) {
  L.DomEvent.on(checkboxes[i], 'change', function() {
    var layers = getLayerSet();
    wms.setParams({
      layers: layers
    });
    beforeWms.setParams({
      layers: layers
    });
  });
}
