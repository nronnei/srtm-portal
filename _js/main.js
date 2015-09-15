////
// Set up sidebar
////

$.fn.sidebar = function(options) {
    var $sidebar = this;
    var $tabs = $sidebar.find('ul.sidebar-tabs, .sidebar-tabs > ul');
    var $container = $sidebar.children('.sidebar-content').first();

    options = $.extend({
        position: 'left'
    }, options || {});

    $sidebar.addClass('sidebar-' + options.position);

    $tabs.children('li').children('a').on('click', function(e) {
        e.preventDefault();
        var $tab = $(this).closest('li');

        if ($tab.hasClass('active'))
            $sidebar.close();
        else if (!$tab.hasClass('disabled'))
            $sidebar.open(this.hash.slice(1), $tab);
    });

    $sidebar.find('.sidebar-close').on('click', function() {
        $sidebar.close();
    });

    $sidebar.open = function(id, $tab) {
        if (typeof $tab === 'undefined')
            $tab = $tabs.find('li > a[href="#' + id + '"]').parent();

        // hide old active contents
        $container.children('.sidebar-pane.active').removeClass('active');

        // show new content
        $container.children('#' + id).addClass('active');

        // remove old active highlights
        $tabs.children('li.active').removeClass('active');

        // set new highlight
        $tab.addClass('active');

        $sidebar.trigger('content', { 'id': id });

        if ($sidebar.hasClass('collapsed')) {
            // open sidebar
            $sidebar.trigger('opening');
            $sidebar.removeClass('collapsed');
        }
    };

    $sidebar.close = function() {
        // remove old active highlights
        $tabs.children('li.active').removeClass('active');

        if (!$sidebar.hasClass('collapsed')) {
            // close sidebar
            $sidebar.trigger('closing');
            $sidebar.addClass('collapsed');
        }
    };

    return $sidebar;
};

var sidebar = $('#sidebar').sidebar();


////
// Set static variables
////

// Setup layers
// Mapbox layers
var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>.'
var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnJvbm5laSIsImEiOiJ2emt3WUY4In0.cRYAp7rDFZvRUBkExD5kqQ';
var sat = L.tileLayer(mbUrl, {id: 'mapbox.satellite', attribution: mbAttr});
var outdoors = L.tileLayer(mbUrl, {id: 'mapbox.outdoors', attribution: mbAttr});
var emerald = L.tileLayer(mbUrl, {id: 'mapbox.emerald', attribution: mbAttr});
// Basic SRTM layers
var srtmAttr = ' | Hole-filled  seamless SRTM data V4.1, available from <a href="http://srtm.csi.cgiar.org/">CGIAR-CSI</a>.';
var dem = L.tileLayer('http://localhost:8080/dem/{z}/{x}/{y}/dem.png', {attribution: srtmAttr});
var hillshade = L.tileLayer('http://localhost:8080/hillshade/{z}/{x}/{y}/shade.png', {attribution: srtmAttr});
var slope = L.tileLayer('http://localhost:8080/slope/{z}/{x}/{y}/slope.png', {attribution: srtmAttr});
// SRTM error layers
var errAttr = ' | Error Simulation by A. Shortridge & J. Messina';
var sim1 = L.tileLayer('http://localhost:8080/sim1/{z}/{x}/{y}/sim1.png', {attribution: errAttr});
var sim2 = L.tileLayer('http://localhost:8080/sim2/{z}/{x}/{y}/sim2.png', {attribution: errAttr});
var sim3 = L.tileLayer('http://localhost:8080/sim3/{z}/{x}/{y}/sim3.png', {attribution: errAttr});

////
// Setup the map
////

// Set map bounds
var sw = L.latLng(36,-84);
var ne = L.latLng(43,-73);
var bounds = L.latLngBounds(sw, ne);
// Create map object
var map = L.map('map', {
	center: [39.8269, -77.2679],
	zoom: 10,
	minZoom: 7,
	maxZoom: 14,
	maxBounds: bounds,
	layers: [emerald],
	zoomControl: false,
	attributionControl: false,
	layerControl: false
});
// Graticle layer
var gratStyle = {
	fillColor: '#555555',
	fillOpacity: 0.5,
	color: '#555555',
	opacity: 1
};
var gratLayer = L.geoJson(graticle, {style: gratStyle,
																 onEachFeature: function (feature, layer) {
																	 layer.bindPopup('<p><b>Tile: </b> '+feature.properties.tilename+'</p>'+
																									 '<a target=_blank href="">Download Error Sims</a>');}
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
var overlays = {'Download':gratLayer, 'Hillshade': hillshade, 'DEM': dem, 'Error Sim 1': sim1, 'Error Sim 2': sim2, 'Error Sim 3': sim3, 'Slope': slope};
L.control.layers(baseLayers, overlays).addTo(map);