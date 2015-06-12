var API_KEY = "221959d56cb10c3917377f0ec06580bc";
var GENRES = ["rock", "metal", "dance", "techno", "reggae"]
var LIMIT_ARTISTS_BY_CITY = 10;
var LIMIT_TAGS_BY_ARTIST = 50;
var TAGS_BY_CITY = [];

var CityVibe = function() {

	this.init = function() {
		//this.getCitiesByCountry();
		this.getArtistsByCity();
	}

	this.getCitiesByCountry = function() {
		$.ajax({
			url: "http://ws.audioscrobbler.com/2.0/?method=geo.getMetros&country=germany&api_key=" + API_KEY,
			type: "GET",

			success: function( data ) {
				//console.log(data);
				var metros = data.getElementsByTagName("metro");

				for(metro in metros) {
					$.ajax({
						url: "http://ws.audioscrobbler.com/2.0/?method=geo.getmetroartistchart&country=germany&metro=hamburg&api_key=" + API_KEY,
						type: "GET",
						success: function( data ) {
							console.log(data);
						}
					})
					console.log(metro);
				}

				//CHECK TAGS
			}
		})
	}

	this.getArtistsByCity = function() {
		var self = this;
		$.ajax({
			url: "http://ws.audioscrobbler.com/2.0/?method=geo.getmetroartistchart&country=germany&metro=hamburg&format=json&limit=" + LIMIT_ARTISTS_BY_CITY + "&api_key=" + API_KEY,
			type: "GET",
			async: true,
			success: function( data ) {
				var artists = data.topartists.artist;

				for (var i = 0, l = artists.length; i < l; i++) {
					var artist_name = artists[i].name;
					tags = self.getArtistTags(artist_name);
				}
			},
			error: function() {
				// NEVER FAIL PLEASE
			}
		});
	}

	this.getArtistTags = function( artist_name ) {
		var self = this;
		$.ajax({
			url: "http://ws.audioscrobbler.com/2.0/?method=artist.getTopTags&format=json&artist=" + artist_name + "&api_key=" + API_KEY,
			type: "GET",
			async: true,
			success: function( data ) {
				var tags = data.toptags.tag;
				
				var loops = tags.length > LIMIT_TAGS_BY_ARTIST ? LIMIT_TAGS_BY_ARTIST : tags.length;

				for (var i = 0; i < loops; i++) {
					TAGS_BY_CITY.push(tags[i].name);
				}
			},
			error: function() {
				// NEVER FAIL PLEASE
			}
		});
	}

	this.showResults = function() {
		console.log(TAGS_BY_CITY);
	}

	this.init();
}

var cityVibe = new CityVibe();

$(document).ajaxStop(function() {
	cityVibe.showResults();
});