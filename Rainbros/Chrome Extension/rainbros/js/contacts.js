// Message on friends page.
function displayFriendMessage(msg) {
  document.getElementById("friend-msg").innerHTML = msg;
}

function clearAddFriendInput() {
	document.getElementById("add-friend-input").value = "";
}

// Add a friend to the table of friends.
function addFriendshipRow(friend) {
	var tableBody = document.getElementById("friends-table-body");
	var row = document.createElement("tr");

	var formTableData = document.createElement("td");
	var checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.value = friend;
	checkbox.className = "friendCheckBox";
	formTableData.appendChild(checkbox);
	row.appendChild(formTableData);

	var friendTableData = document.createElement("td");
	friendTableData.innerHTML = friend;
	row.appendChild(friendTableData);

	tableBody.appendChild(row);
}

// POST a friendship to the database.
function createFriendship(friend) {
  var request1 = new XMLHttpRequest();
  request1.open('POST', 'http://stanford.edu/~scottk92/cgi-bin/rainbros/addFriend.php?user=' + localStorage.username + '&friend=' + friend, true);
  request1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request1.send({});

  var request2 = new XMLHttpRequest();
  request2.open('POST', 'http://stanford.edu/~scottk92/cgi-bin/rainbros/addFriend.php?user=' + friend + '&friend=' + localStorage.username, true);
  request2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request2.send({});

  addFriendshipRow(friend);
  clearAddFriendInput();
}

function verifyNewFriendship(friend) {
  var request = new XMLHttpRequest();
  request.open('GET', 'http://stanford.edu/~scottk92/cgi-bin/rainbros/friendshipExists.php?user=' + localStorage.username + '&friend=' + friend, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      // Success!
      resp = request.responseText;
      var friendship = parseInt(resp);
      if (friendship == 0) {
        createFriendship(friend);
      } else {
        displayFriendMessage("You are already friends with " + friend);
      }
    } else {
      // We reached our target server, but it returned an error
      console.log("Error");
    }
  };
  request.onerror = function() {
    // There was a connection error of some sort
    console.log("Error");
  };
  request.send();
}

// Check if a user exists before adding as a friend
function verifyFriendExists(friend) {
  var request = new XMLHttpRequest();
  request.open('GET', 'http://stanford.edu/~scottk92/cgi-bin/rainbros/userExists.php?username=' + friend, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      // Success!
      resp = request.responseText;
      var numUsers = parseInt(resp);
      if (numUsers == 1) {
        verifyNewFriendship(friend);
      } else {
        displayFriendMessage("A user with the name " + friend + " does not exist.");
      }
    } else {
      // We reached our target server, but it returned an error
      console.log("Error");
    }
  };
  request.onerror = function() {
    // There was a connection error of some sort
    console.log("Error");
  };
  request.send();
}

function addFriend(friend) {
	if (!friend) {
		displayFriendMessage("Insert a friend's name.");
	} else {
		verifyFriendExists(friend);
	}
}

// Uncheck all the friends.
function uncheckFriends() {
	var checkboxes = document.getElementsByClassName("friendCheckBox");
	for (var i=0; i<checkboxes.length; i++) {
		checkboxes[i].checked = false;
	}
}

// Returns an array of all the friends who are checked.
function getCheckedFriends() {
	var checkboxes = document.getElementsByClassName("friendCheckBox");
	var friends = [];
	for (var i=0; i<checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			friends.push(checkboxes[i].value);
		}
	}
	return friends;
}

// Sends a GET request for a user's friends data.
function getContacts() {
  var request = new XMLHttpRequest();
  request.open('GET', 'http://stanford.edu/~scottk92/cgi-bin/rainbros/getFriends.php?user=' + localStorage.username, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      // Success!
      resp = request.responseText;
      data = JSON.parse(resp);
      populateContacts(data.friends);
    } else {
      // We reached our target server, but it returned an error
      console.log("Error");
    }
  };
  request.onerror = function() {
    // There was a connection error of some sort
    console.log("Error");
  };
  request.send();
}

// Fills the table with friend information.
function populateContacts(friends) {
	if (friends.length == 0) {
		displayFriendMessage("Oh no, you have no friends :( Add some today!");
	} else {
		displayFriendMessage("");
		var tableBody = document.getElementById("friends-table-body");
		for (var i=0; i<friends.length; i++) {
			addFriendshipRow(friends[i]);
		}
	}
}