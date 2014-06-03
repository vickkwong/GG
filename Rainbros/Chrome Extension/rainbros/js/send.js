function displaySendMessage(msg) {
  document.getElementById("send-msg").innerHTML = msg;
}

var fb = new Firebase('https://rainbros.firebaseIO.com/');

// POST the message to the database.
function sendColor(sender, recipient, message, color) {
  console.log("sent color");
  var request = new XMLHttpRequest();
  request.open('POST', 'http://stanford.edu/~scottk92/cgi-bin/rainbros/postMessages.php?sender=' + encodeURIComponent(sender) + '&recipient=' + encodeURIComponent(recipient) + '&message=' + encodeURIComponent(message) + '&color=' + color, true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send({});
  document.getElementById('messageInput').value = "";
  fb.push({
    from:sender,
    to:recipient,
    message:message
  });
}

// Check if the recipient exists
function verifyUserExists(sender, recipient, message, color) {
  var request = new XMLHttpRequest();
  request.open('GET', 'http://stanford.edu/~scottk92/cgi-bin/rainbros/userExists.php?username=' + recipient, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      // Success!
      resp = request.responseText;
      var numUsers = parseInt(resp);
      if (numUsers == 1) {
        sendColor(sender, recipient, message, color);
      } else {
        // Should not reach here
        console.log("That user doesn't exist...");
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

function countSpaces(str) {
  var count = 0;
  for (var i=0; i<str.length; i++) {
    if (str[i] == " ") count++;
  }
  return count;
}

// Validate the message before proceeding to the contacts page
function validateMessage(sender, message, color) {
  if (!sender) {
    displaySendMessage("Please log in.");
    return false;
  } else if (!color) {
    displaySendMessage("Please include a color.");
    return false;
  } else if (message.length > 50) {
    displaySendMessage("Messages cannot exceed 50 characters. Your message is " + message.length + " characters.");
    return false;
  } else if (color.length != 6) {
    displaySendMessage("Invalid color option.");
    return false;
  } else if (countSpaces(message) > 1) {
    displaySendMessage("Messages cannot be more than 2 words.");
    return false;
  }
  return true;
}

// Validate that friends were selected.
function validateFriends(sender, message, color) {
  var recipients = getCheckedFriends();
  if (recipients.length == 0) {
    displayFriendMessage("Select at least one friend to send it to.");
    return false;
  } else {
    for (var i=0; i<recipients.length; i++) {
      verifyUserExists(sender, recipients[i], message, color);
    }
    uncheckFriends();
    document.getElementById("to-inbox").click();
  }
}