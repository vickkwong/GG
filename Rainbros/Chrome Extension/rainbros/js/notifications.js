var id = 0;

function simpleCallback() {
	console.log("callback!");
}

function createNotification(data) {
	var opt = {};
	opt.type = 'basic';
	opt.title = 'New Message';
	opt.message = '"' + data.message + '" -' + data.from;
	opt.iconUrl = 'img/icon128.png';
	chrome.notifications.create(id.toString(), opt, simpleCallback);
}

var fb = new Firebase('https://rainbros.firebaseIO.com/');
fb.on('child_added', function(snapshot) {
	if (localStorage.username != undefined && snapshot.val().to == localStorage.username) {
  	createNotification(snapshot.val());
  	id++;
  }
});