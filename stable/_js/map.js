/**
 * Created by nick on 6/2/15.
 */
////
// Set static variables
////

// Mapbox Access Token
L.mapbox.accessToken = 'pk.eyJ1IjoibnJvbm5laSIsImEiOiJ2emt3WUY4In0.cRYAp7rDFZvRUBkExD5kqQ';
// Setup layers
var dem = L.tileLayer('http://muggles.ddns.net:8080/dem/{z}/{x}/{y}/dem.png');
var hillshade = L.tileLayer('http://muggles.ddns.net:8080/hillshade/{z}/{x}/{y}/shade.png');
var slope = L.tileLayer('http://muggles.ddns.net:8080/slope/{z}/{x}/{y}/slope.png');
var mbs = L.mapbox.tileLayer('mapbox.streets');
var custom = L.mapbox.tileLayer('nronnei.mbe4b4ei');

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
    id: 'mapbox',
    layers: [hillshade, dem, slope],
    attributionControl: {
        compact: true
    }
});

////
// Set controls
////

//Layer Control
var baseLayers = {'Hillshade': hillshade, 'Mapbox Streets': mbs, 'Custom': custom};
var overlays = {'DEM': dem, 'Slope': slope};
var layerControlOpts = {position: 'topright', collapsed: false};
L.control.layers(baseLayers, overlays, layerControlOpts).addTo(map);

// Hamburger Menu
