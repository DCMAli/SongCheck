var config = {
    apiKey: "AIzaSyAJ-h3X7RoJ4BsPnyrK7TFArZ1LjSsVfhY",
    authDomain: "project1-3f7fd.firebaseapp.com",
    databaseURL: "https://project1-3f7fd.firebaseio.com",
    projectId: "project1-3f7fd",
    storageBucket: "project1-3f7fd.appspot.com",
    messagingSenderId: "447834756755"
  };
firebase.initializeApp(config);

var database = firebase.database();
var searchArray = [];

// On submit, take user input and push to Firebase
$("#submit-button").on("click", function(event) {
    // Prevent form from submitting
    event.preventDefault();
    var searchInput = $("#search-input").val().trim();
    database.ref().push({
	    searchItem: searchInput
	});
    $("#search-input").val("");
});

// Retrieve changed Firebase data and show changes in app
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	var searchTerm = childSnapshot.val().searchItem;

	var historyItem = $("<tr><td>" + searchTerm + "</td></tr>");
	searchArray.push(searchTerm);
	console.log(searchArray);
	$("#insert-history-here").append(historyItem);
});