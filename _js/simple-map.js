/****
 * Created by Nick Ronnei (nronnei@gmail.com) during the Summer of 2015.
 ****/

////
// Set static variables
////

// Setup layers
// Mapbox layers
var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnJvbm5laSIsImEiOiJ2emt3WUY4In0.cRYAp7rDFZvRUBkExD5kqQ';
var sat = L.tileLayer(mbUrl, {id: 'mapbox.satellite', attribution: mbAttr});
var outdoors = L.tileLayer(mbUrl, {id: 'mapbox.outdoors', attribution: mbAttr});
var emerald = L.tileLayer(mbUrl, {id: 'mapbox.emerald', attribution: mbAttr});
// Custom layers
var dem = L.tileLayer('http://35.8.15.45:8080/dem/{z}/{x}/{y}/dem.png');
var hillshade = L.tileLayer('http://35.8.15.45:8080/hillshade/{z}/{x}/{y}/shade.png');
var slope = L.tileLayer('http://35.8.15.45:8080/slope/{z}/{x}/{y}/slope.png');


////
// Setup the map
////

// Set map bounds
var sw = L.latLng(36.540738,-83.675413);
var ne = L.latLng(42.269860,-73.893979);
var bounds = L.latLngBounds(sw, ne);
// Create map object
var map = L.map('map', {
	center: [39.8269, -77.2679],
	zoom: 10,
	minZoom: 7,
	maxZoom: 14,
	maxBounds: bounds,
	layers: [emerald, hillshade, dem, slope],
	zoomControl: false,
	attributionControl: false,
	layerControl: false
});

////
// Set controls
////

// Zoom control
L.control.zoom({position: 'bottomright'}).addTo(map);
// Attribution control
L.control.attribution({position: 'bottomleft', compact: true}).addTo(map);
//Layer control
var baseLayers = {'Mapbox Emerald': emerald, 'Mapbox Satellite': sat, 'Mapbox Outdoors': outdoors};
var overlays = {'Hillshade': hillshade, 'DEM': dem, 'Slope': slope};
L.control.layers(baseLayers, overlays).addTo(map);