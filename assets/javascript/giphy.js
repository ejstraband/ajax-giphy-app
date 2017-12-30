// array of people
var characters = ["Bugs Bunny", "Daffy Duck", "Elmer Fudd", "The Tazmanian Devil", "Foghorn Leghorn", "Road Runner", "Wile E. Coyote", "Gossamer", "Marvin the Martian", "Michigan J. Frog"]
var currentCharacter;
console.log(characters);

// build the buttons

console.log("page load");

for (var i = 0; i < characters.length; i++) {
$(".buttons").append('<button id="' + characters[i] + '">' + characters[i] + '</button>')
}

// button is clicked to pick the current character

$("button").click(function() {
	console.log("button clicked");
	currentCharacter = $(this).attr("id");
	console.log("Current Character is: " + currentCharacter);
});
