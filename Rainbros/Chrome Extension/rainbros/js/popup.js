document.addEventListener('DOMContentLoaded', function () {
  
  function colorChangeCallback(color) {
    document.getElementById("color-picker").value = color.substring(1);
    var newColor = getTextColor(color.substring(1));
    document.getElementById("messageInput").style.color = newColor;
    document.getElementById("send-msg").style.color = newColor;
    document.getElementById("back-to-friends").style.color = newColor;
    document.getElementById("send-page").style.backgroundColor = color;
  }

  document.getElementById("messageInput").addEventListener("click", function(){
    this.placeholder = "";
  });

  $('#colorpicker').farbtastic('#color-picker');
  $.farbtastic("#colorpicker").linkTo(colorChangeCallback);
  $.farbtastic("#colorpicker").setColor('#'+Math.floor(Math.random()*16777215).toString(16));

  // Log in Button
  document.getElementById("login-btn").addEventListener("click", function(e){
    e.preventDefault();
    var username = document.getElementById("usernameInput").value;
    var password = document.getElementById("passwordInput").value;
    loginUser(username, password);
  });

  // Sign up Button
  document.getElementById("signup-btn").addEventListener("click", function(e){
    e.preventDefault();
    var username = document.getElementById("usernameInput").value;
    var password = document.getElementById("passwordInput").value;
    verifySignupInfo(username, password);
  });

  // Send Message Button
  document.getElementById("send-btn").addEventListener("click", function(e){
    e.preventDefault();
    var sender = document.getElementById('senderInput').value;
    var message = document.getElementById('messageInput').value;
    var color = document.getElementById('color-picker').value;
    validateMessage(sender, message, color);
  });

  // Add Friend Button
  document.getElementById("add-btn").addEventListener("click", function(e){
    var friendName = document.getElementById("add-friend-input").value;
    addFriend(friendName);
  });

  var landingPage = document.getElementById("landing-page");
  var inboxPage = document.getElementById("home-page");
  var sendPage = document.getElementById("send-page");
  var friendPage = document.getElementById("friend-page");

  // Transition to the inbox page
  document.getElementById("to-inbox").addEventListener("click", function(){
    requestInbox(localStorage.username);
    landingPage.style.display = 'none';
    inboxPage.style.display = 'block';
    sendPage.style.display = 'none';
    friendPage.style.display = 'none';
  });

  function toSendPage() {
    if (validateFriends()) {
      landingPage.style.display = 'none';
      inboxPage.style.display = 'none';
      sendPage.style.display = 'block';
      friendPage.style.display = 'none';
      document.getElementById("messageInput").placeholder = "What are you feeling?";
      $.farbtastic("#colorpicker").setColor('#'+Math.floor(Math.random()*16777215).toString(16));
      document.getElementById("send-msg").innerHTML = "";
    }
  }

  function toFriendsPage() {
    landingPage.style.display = 'none';
    inboxPage.style.display = 'none';
    sendPage.style.display = 'none';
    friendPage.style.display = 'block';
  }

  // Transition to the send page
  document.getElementById("to-send").addEventListener("click", function(){
    toSendPage();
  });

  // Transition to the send page
  document.getElementById("back-to-friends").addEventListener("click", function(){
    toFriendsPage();
  });

  // Transition to the friend page
  document.getElementById("to-friends").addEventListener("click", function(){
    toFriendsPage();
  });

  // If the user is already logged in
  if (localStorage.username != undefined) {
    getContacts();
    document.getElementById("senderInput").value = localStorage.username;
    document.getElementById("to-inbox").click();
  }
});
