document.addEventListener('DOMContentLoaded', function () {
  
  function colorChangeCallback(color) {
    document.getElementById("color-picker").value = color.substring(1);
    document.getElementById("messageInput").style.color = getTextColor(color.substring(1));
    document.getElementById("send-page").style.backgroundColor = color;
    //console.log(color);
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

  // Implement the color picker to change the background color of the send page
  /*document.getElementById("color-picker").addEventListener("change", function() {
    document.getElementById("messageInput").style.color = getTextColor(this.value);
    document.getElementById("send-page").style.backgroundColor = '#' + this.value;
  });*/

  // Send Message Button
  document.getElementById("send-btn").addEventListener("click", function(e){
    e.preventDefault();
    var sender = document.getElementById('senderInput').value;
    var message = document.getElementById('messageInput').value;
    var color = document.getElementById('color-picker').value;
    validateFriends(sender, message, color);
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
    landingPage.style.display = 'none';
    inboxPage.style.display = 'none';
    sendPage.style.display = 'block';
    friendPage.style.display = 'none';
    document.getElementById("messageInput").placeholder = "What are you feeling?";
    $.farbtastic("#colorpicker").setColor('#'+Math.floor(Math.random()*16777215).toString(16));
  }

  // Transition to the send page
  document.getElementById("to-send").addEventListener("click", function(){
    toSendPage();
  });
  // Transition to the send page
  document.getElementById("back-to-send").addEventListener("click", function(){
    toSendPage();
  });

  // Transition to the friend page
  document.getElementById("to-friends").addEventListener("click", function(){
    var sender = document.getElementById('senderInput').value;
    var message = document.getElementById('messageInput').value;
    var color = document.getElementById('color-picker').value;
    
    if (validateMessage(sender, message, color)) {
      landingPage.style.display = 'none';
      inboxPage.style.display = 'none';
      sendPage.style.display = 'none';
      friendPage.style.display = 'block';
    }
  });

  // If the user is already logged in
  if (localStorage.username != undefined) {
    getContacts();
    document.getElementById("senderInput").value = localStorage.username;
    document.getElementById("to-inbox").click();
  }
});
