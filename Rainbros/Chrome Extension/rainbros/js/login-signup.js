// Display a message to the user on the login/signup page.
function displayLoginSignupMsg(msg) {
  document.getElementById("login-signup-msg").innerHTML = msg;
}

// Save a user's info in local storage and initialize some stuff.
function recordUser(username) {
  localStorage.username = username;
  document.getElementById("senderInput").value = username;
  document.getElementById("to-inbox").click();
  getContacts();
}

// Log in a user.
function loginUser(username, password) {
  var request = new XMLHttpRequest();
  request.open('GET', 'http://stanford.edu/~scottk92/cgi-bin/rainbros/login.php?username=' + username + '&password=' + password, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      // Success!
      resp = request.responseText;
      if (resp == "Success") {
        recordUser(username);
      } else {
        displayLoginSignupMsg("Incorrect login credentials");
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

// Register a user.
function registerUser(username, password) {
  var request = new XMLHttpRequest();
  request.open('GET', 'http://stanford.edu/~scottk92/cgi-bin/rainbros/signup.php?username=' + username + '&password=' + password, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      // Success!
      resp = request.responseText;
      if (resp == "Success") {
        recordUser(username);
      } else {
        displayLoginSignupMsg("We were unable to sign you up.");
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

// Check if that username already exists.
function verifyUniqueUsername(username, password) {
  var request = new XMLHttpRequest();
  request.open('GET', 'http://stanford.edu/~scottk92/cgi-bin/rainbros/userExists.php?username=' + username, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      // Success!
      resp = request.responseText;
      var numUsers = parseInt(resp);
      if (numUsers == 0) {
        registerUser(username, password);
      } else {
        displayLoginSignupMsg("A user with that username already exists.");
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

// Verify that the username and password are valid.
function verifySignupInfo(username, password) {
  if (!username || !password) {
    displayLoginSignupMsg("Please fill in all fields.");
    return false;
  } else if (username.length <5 || password.length < 5) {
    displayLoginSignupMsg("Username and password must be at least 5 characters.");
    return false;
  } else {
    verifyUniqueUsername(username, password);
  }
}