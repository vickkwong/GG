var previousInboxLength = 0;

// Construct the DOM inbox.
function buildInbox(inbox) {
  var carousel = document.getElementById("carousel-example-generic");
  var emptyInboxMsg = document.getElementById("empty-inbox-msg");
  if (inbox.length == 0) {
    // Empty inbox
    carousel.style.display = 'none';
    emptyInboxMsg.style.display = 'block';
  } else {
    var carouselBody = document.getElementById("carousel-body");
    var carouselIndicators = document.getElementById("indicators");
    var indicators = "";
    carouselBody.innerHTML = '';
    carousel.style.display = 'block';
    emptyInboxMsg.style.display = 'none';

    for (var i=0; i<inbox.length; i++) {
      // Create the Item div
      var sender = inbox[i].senders;
      var message = inbox[i].messages;
      var color = inbox[i].color;
      var item = document.createElement("div");
      if (i == inbox.length -1) {
        item.className = "item active";
        indicators += '<li data-target="#carousel-example-generic" data-slide-to="' + i + '" class="active"></li>';
      } else {
        item.className = "item";
        indicators += '<li data-target="#carousel-example-generic" data-slide-to="' + i + '"></li>';
      }
      item.style.backgroundColor = '#' + color;

      // Caption
      var caption = document.createElement("div");
      caption.className = "carousel-caption";
      caption.innerHTML = '"'+ message + '" -' + sender;

      // Append
      item.appendChild(caption);
      carouselBody.appendChild(item);
    }
    // Add the indicators
    carouselIndicators.innerHTML = indicators;

    // Restart the carousel so it moves again
    $("#carousel-example-generic").carousel('pause').removeData();
    $("#carousel-example-generic").carousel(inbox.length-1);
  }
}

// Send a GET request to get the inbox data.
function requestInbox(username) {
  request = new XMLHttpRequest();
  request.open('GET', 'http://stanford.edu/~scottk92/cgi-bin/rainbros/getMessages.php?recipient=' + username, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      // Success!
      resp = request.responseText;
      data = JSON.parse(resp);
      var inbox = data.inbox;
      if (inbox.length > previousInboxLength || inbox.length == 0) {
        previousInboxLength = inbox.length;
        buildInbox(inbox);
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
