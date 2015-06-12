
/* Define genre tags */
function getGenreHashmap() {

	var genres = new Array;
	genres['alternative']	= 'independent, indie, alternative, emo, grunge, ebm, indie-rock, indierock';
	genres['dance'] 		= 'dance, dubstep, rnb, r&b, house, club, techno, dub, dancehall';
	genres['electro'] 		= 'electro, electronica, electronic, dance, electro house';
	genres['pop'] 			= 'pop, popmusic, charts, britpop, british';
	genres['rock'] 			= 'alternative rock, rock, progressive, hard rock';
		
	return genres;
}


/* Analyse tags and count per genre */
function analyseGenre(tags) {
	
	var genres = getGenreHashmap();
	// initialize result array with keys from genres
	var result = new Array();
	for (var genre in genres) {
		result[genre] = 0;
	}
	
	// loop tags and compare with genrehashmap
	for (var i = 0; i < tags.length; i++) 
	{
		for (var genre in genres) {
			if (genres[genre].indexOf(tags[i].toLowerCase()) != -1)
			{
				result[genre]++;
			}
		}
	}
	return result;
}

var API_KEY = "221959d56cb10c3917377f0ec06580bc";
var GENRES = ["rock", "metal", "dance", "techno", "reggae"]
var LIMIT_ARTISTS_BY_CITY = 10;
var LIMIT_TAGS_BY_ARTIST = 50;
var TAGS_BY_CITY = [];
var ANALYZED_GENRES;

var CityVibe = function( ops ) {

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
				}
			}
		})
	}

	this.getArtistsByCity = function() {
		var self = this;
		$.ajax({
			url: "http://ws.audioscrobbler.com/2.0/?method=geo.getmetroartistchart&country=" + ops.country + "&metro=" + ops.city + "&format=json&limit=" + LIMIT_ARTISTS_BY_CITY + "&api_key=" + API_KEY,
			type: "GET",
			async: true,
			success: function( data ) {
				var artists = data.topartists.artist;

				for (var i = 0, l = artists.length; i < l; i++) {
					var artist_name = artists[i].name;
					self.getArtistTags(artist_name);
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

	this.init();
}

var Results = function( genres ) {
	var $skycrapers = $(".skycraper");
	this.init = function() {
		this.buildSkycrapers();
	}

	this.buildSkycrapers = function() {

		this.openOverlay();

		var total = this.getTotal();
		var i = 0;

		var t = window.setTimeout(function() {
			for (genre in genres) {
				$skycrapers.eq(i).css({
					height: total / 100 * genres[genre] + "%",
				}).find(".genre").text(genre);

				i++;
			}
		}, 500);
	}

	this.getTotal = function() {
		var total = 0;

		for (genre in genres ) {
			total += genres[genre];
		}

		return total;
	}

	this.openOverlay = function() {
		$('body').addClass("open-overlay");
	}

	this.init();
}

$(document).ajaxStop(function() {
	var results = new Results(analyseGenre(TAGS_BY_CITY));
});

$(".close").on('click', function(e) {
	e.preventDefault();
	e.stopPropagation();
	$("body").removeClass("open-overlay");
	TAGS_BY_CITY = [];
	ANALYZED_GENRES;
	$(".skycraper").css({
		height: 0,
	})
});