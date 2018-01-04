// array of people
var characters = ["Bugs Bunny", "Daffy Duck", "Elmer Fudd", "The Tazmanian Devil", "Foghorn Leghorn", "Road Runner", "Wile E. Coyote", "Gossamer", "Marvin the Martian", "Michigan J. Frog"]
var currentCharacter;
console.log(characters);

// load the page
console.log("page load");

// build the buttons
for (var i = 0; i < characters.length; i++) {
$(".buttons").append('<button id="' + characters[i] + '">' + characters[i] + '</button>')
}

// main function

// button is clicked to pick the current character
$("button").click(function() {
	// empty the gif div
	console.log("Div Emptied");
	$("#gifs").empty();

	// log the button click event
	console.log("button clicked");
	currentCharacter = $(this).attr("id");
	console.log("Current Character is: " + currentCharacter);

	// build out the search
	var searchString = "search?limit=10&q=" + currentCharacter + "&rating=g&api_key=1yhVot2gI6XiVj6HHkib7tef7bGj8NY8";
	console.log("Search String is: " + searchString);

	var searchUrl = "https://api.giphy.com/v1/gifs/" + searchString;
	console.log("Search URL is: " + searchUrl);

	// run the ajax call
	$.ajax(searchUrl).done(function (response) {
		console.log("AJAX response is: " + response);
		var results = response.data;
		console.log(results.length);
		// var gossamerUrl = "https://media0.giphy.com/media/IqAzHA6jooBTW/giphy_s.gif"

		for (var i = 0; i < results.length; i++) {
			var stillImage = response.data[i].images.original_still.url
			var animatedImage = response.data[i].images.original.url
			$("#gifs").append('<img id="fetchedGif' + (i+1) + '" src="' + stillImage + '">');
			console.log(response.data[i].images.original_still);
			}
		});

});
