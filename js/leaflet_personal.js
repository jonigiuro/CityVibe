var map;
var markers = [
	{lat : 53.551085, long : 9.993682, id : 'hamburg', country: "germany", options : {riseOnHover : true}},
	{lat : 52.520007, long : 13.404954, id : 'berlin', country: "germany", options : {riseOnHover : true}}
];

$( document ).ready(function() {
	initMap();
	addMarkers();
});


function initMap() {
	var layer = getParameterByName('map') || 'toner';
	map = new L.Map(layer, {
		center: new L.LatLng(markers[0].lat, markers[0].long),
		zoom: 10
	});
	map.addLayer(new L.StamenTileLayer(layer, {
		detectRetina: true
	}));
}

function addMarkers() {
	for(var i = 0; i < markers.length;i++) {
		var item = markers[i];
		var marker = L.marker([item.lat, item.long], item.options).addTo(map);
		marker.on('click', onMarkerClick);
		marker.data = item;
	}
}

function onMarkerClick(event) {
	var city = event.target.data.id;
	var country = event.target.data.country;
	var cityVibe = new CityVibe({
		city: city,
		country: country,
	});
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}