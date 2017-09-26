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
var provider = new firebase.auth.GoogleAuthProvider();
var searchArray = [];

firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  var user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

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