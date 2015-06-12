var map;
var markers = [
            {lat : 53.551085, long : 9.993682, country : 'germany', id : 'hamburg', options : {riseOnHover : true}},
            {lat : 53.079296, long : 8.801694, country : 'germany', id : 'bremen', options : {riseOnHover : true}},
            {lat : 54.092441, long : 12.099147, country : 'germany', id : 'rostock', options : {riseOnHover : true}},
            {lat : 51.050409, long : 13.737262, country : 'germany', id : 'dresden', options : {riseOnHover : true}},
            {lat : 50.110922, long : 8.682127, country : 'germany', id : 'frankfurt', options : {riseOnHover : true}},
            {lat : 50.937531, long : 6.960279, country : 'germany', id : 'cologne', options : {riseOnHover : true}},
            {lat : 48.135125, long : 11.581981, country : 'germany', id : 'munich', options : {riseOnHover : true}},
            {lat : 48.775846, long : 9.182932, country : 'germany', id : 'stuttgart', options : {riseOnHover : true}},
            {lat : 52.520007, long : 13.404954, country : 'germany', id : 'berlin', options : {riseOnHover : true}},
            {lat : 52.120533, long : 11.627624, country : 'germany', id : 'magdeburg', options : {riseOnHover : true}},
            {lat : 46.519962, long : 6.633597, country : 'switzerland', id : 'lausanne', options : {riseOnHover : true}},
            {lat : 47.050038, long : 8.308929, country : 'switzerland', id : 'lucerne', options : {riseOnHover : true}},
            {lat : 47.567442, long : 7.597551, country : 'switzerland', id : 'basel', options : {riseOnHover : true}},
            {lat : 47.368650, long : 8.539183, country : 'switzerland', id : 'zurich', options : {riseOnHover : true}},
            {lat : 46.198392, long : 6.142296, country : 'switzerland', id : 'geneva', options : {riseOnHover : true}},
            {lat : 46.947922, long : 7.444608, country : 'switzerland', id : 'berne', options : {riseOnHover : true}},
            {lat : 46.801666, long : 7.145568, country : 'switzerland', id : 'fribourg', options : {riseOnHover : true}},
            {lat : 51.507351, long : -0.127758, country : 'united kingdom', id : 'london', options : {riseOnHover : true}},
            {lat : 53.480759, long : -2.242631, country : 'united kingdom', id : 'manchester', options : {riseOnHover : true}},
            {lat : 52.486243, long : -1.890401, country : 'united kingdom', id : 'birmingham', options : {riseOnHover : true}},
            {lat : 53.408371, long : -2.991573, country : 'united kingdom', id : 'liverpool', options : {riseOnHover : true}},
            {lat : 53.800755, long : -1.549077, country : 'united kingdom', id : 'leeds', options : {riseOnHover : true}},
            {lat : 48.856614, long : 2.352222, country : 'france', id : 'paris', options : {riseOnHover : true}},
            {lat : 44.837789, long : -0.579180, country : 'france', id : 'bordeaux', options : {riseOnHover : true}},
            {lat : 50.629250, long : 3.057256, country : 'france', id : 'lille', options : {riseOnHover : true}},
            {lat : 55.604981, long : 13.003822, country : 'sweden', id : 'malmö', options : {riseOnHover : true}},
            {lat : 59.329323, long : 18.068581, country : 'sweden', id : 'stockholm', options : {riseOnHover : true}}
        ];

$( document ).ready(function() {
	initMap();
	addMarkers();
});


function initMap() {
	var layer = getParameterByName('map') || 'toner';
	map = new L.Map(layer, {
		center: new L.LatLng(markers[0].lat, markers[0].long),
		zoom: 5
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