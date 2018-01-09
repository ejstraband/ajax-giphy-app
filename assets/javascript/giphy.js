 // giphy2.js

// html builds the inital page

// primary variables
	// array of topics
	var topics = ["Bugs Bunny", "Daffy Duck", "Elmer J. Fudd", "The Tazmanian Devil", "Foghorn Leghorn", "Road Runner", "Wile E. Coyote", "Gossamer", "Marvin the Martian", "Michigan J. Frog"];
	var currentCharacter;
	console.log("Initial topics: " + topics);

// core functions

	// add new topic
	function addTopic() {
		var newTopic = $("#newTopic").val().trim();
		console.log("Additional topic is: " + newTopic);
		topics.push(newTopic);
		buttonBuilder();
		}

	// draw buttons
	function buttonBuilder() {
		$(".buttons").empty();
		console.log("buttons emptied");
		for (var i = 0; i < topics.length; i++) {
		$(".buttons").append('<button id="' + topics[i] + '">' + topics[i] + '</button>')
		}
		console.log("buttons written");
		}

	// empty the gifs div
	function emptyGifsDiv() {
		$("#gifs").empty();
		console.log("Div Emptied");		
	}

	// fetch gifs
	function displayGifs() {
		emptyGifsDiv();

		currentCharacter = $(this).attr("id");

		var searchString = "search?limit=10&q=" + currentCharacter + "&rating=g&api_key=1yhVot2gI6XiVj6HHkib7tef7bGj8NY8";
		console.log("Search String is: " + searchString);

		var searchUrl = "https://api.giphy.com/v1/gifs/" + searchString;
		console.log("Search URL is: " + searchUrl);

		// ajax request details

		$.ajax(searchUrl).done(function(response) {
			console.log("AJAX response is: " + response);
			var results = response.data;
			console.log(results.length);

			// get the gifs
			for (var i = 0; i < results.length; i++) {
				var stillImage = response.data[i].images.fixed_width_still.url;
				console.log(stillImage);
				var animatedImage = response.data[i].images.fixed_width.url;
				console.log(animatedImage);
				var rating = response.data[i].rating;
				console.log(rating);

			// write them out to the page	
			$("#gifs").append('<img src="' + stillImage + '" data-still="' + stillImage + '" data-animate="' + animatedImage + '" data-state="still" class="gif">');
			$("#gifs").append('<p> Rating: ' + rating + '</p>');
			}
		});
	}

	// animate gifs
	function gifAnimator() {
		console.log("image clicked");
		var state = $(this).attr("data-state");
		console.log(state);
		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}	
	}

// Primary Application Logic

buttonBuilder();
console.log("inital buttons drawn");
// click event to add a topic to the array

$("#addTopic").on("click", function(e) {
	e.preventDefault();
	addTopic();
});

// click event to fetch images
$(document).on("click", "button", displayGifs);

// click even to animate images
$(document).on("click", ".gif", gifAnimator);