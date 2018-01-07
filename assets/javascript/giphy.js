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

		for (var i = 0; i < results.length; i++) {
			var stillImage = response.data[i].images.original_still.url
			console.log(stillImage);
			var animatedImage = response.data[i].images.original.url
			console.log(animatedImage);
			$("#gifs").append('<img src="' + stillImage + '" data-still="' + stillImage + '" data-animate="' + animatedImage + '" data-state="still" class="gif">');
			}

	// gif click to swap image
	$(".gif").on("click", function() {
		console.log("image clicked");
		var state = $(this).attr("data-state");
		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
		});

	});

});