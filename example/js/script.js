"use strict";

var checkboxes = document.querySelectorAll('#legend input[type=checkbox]');

function getLayerSet() {
  var set = [];
  for (var i = 0, len = checkboxes.length; i < len; i++) {
    if (checkboxes[i].checked) set.push(checkboxes[i].name);
  }
  return set;
}

var map = L.map('map').setView([45, -93.2], 6);
var wms = L.tileLayer.wms(
  'http://sampleserver1.arcgisonline.com/ArcGIS/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/WMSServer', {
    layers: getLayerSet(),
    transparent: true
  }).addTo(map);

for (var i = checkboxes.length - 1; i >= 0; i--) {
  L.DomEvent.on(checkboxes[i], 'change', function() {
    wms.setParams({
      layers: getLayerSet()
    });
  });
}
