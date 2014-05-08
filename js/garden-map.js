function GardenMap(id, gardenAdderId) {
	this.gardenMap = document.getElementById(id);
	this.gardenAdder = document.getElementById(gardenAdderId);
}

GardenMap.prototype.populate = function(userId, fb) {
	console.log("populate being called");
	var gardenMap = this.gardenMap;
	gardenMap.innerHTML = '';
  	fb.child('users/' + userId).once('value', function(userSnap) {
  	  var gardens = userSnap.val().gardens;
  	  for(var key in gardens) {
  	  	console.log(key);

  	  	// Garden Container div
  	  	var gardenContainer = document.createElement("div");
  	  	gardenContainer.className = "garden-container";

  	  	// <a> tag
  	  	var link = document.createElement("a");
  	  	link.href = "file:///Users/scottkhamphoune/Desktop/CS%20247/GG/garden.html?gardenname=" + key;

  	  	// Img
  	  	var img = document.createElement("img");
  	  	img.src = "img/garden.png";
  	  	img.alt = "garden";
  	  	img.className = "garden-icon";

  	  	// Append
  	  	link.appendChild(img);
  	  	gardenContainer.appendChild(link);

  	  	// Title
  	  	var title = document.createElement("p");
  	  	title.className = "garden-title text-center";
  	  	title.innerHTML = key;
  	  	gardenContainer.appendChild(title);

  	  	gardenMap.appendChild(gardenContainer);
  	  }
  	});
}

GardenMap.prototype.showMessage = function(msg, success) {
	if (success) {
		this.successMsg.innerHTML = msg;
		this.successMsg.style.display = 'block';
		this.errorMsg.style.display = 'none';
	} else {
		this.errorMsg.innerHTML = msg;
		this.successMsg.style.display = 'none';
		this.errorMsg.style.display = 'block';
	}
	this.gardenAdder.value = '';
}

GardenMap.prototype.createNewGarden = function(userId, successId, errorId, fb) {
	this.successMsg = document.getElementById(successId);
	this.errorMsg = document.getElementById(errorId);
	this.successMsg.style.display = 'none';
	this.errorMsg.style.display = 'none';

	var gardenMap = this;

	var name = this.gardenAdder.value;
	if (name == "") {
		this.showMessage("Garden name can't be blank", false);
	} else {
		fb.child('gardens').once('value', function(gardenSnap) {
	  	  var gardens = gardenSnap.val();
	  	  for(var key in gardens) {
	  	  	if (key == name) {
	  	  		gardenMap.showMessage("A garden named " + name + " exists already", false);
	  	  		return;
	  	  	}
	  	  }
	  	  // Add garden
	  	  gardenMap.showMessage(name + " successfully created!", true);
	  	  fb.child('gardens/' + name).set(true);
	  	  fb.child('gardens/' + name + '/users/' + userId).set(true);
	  	  fb.child('users/' + userId + '/gardens/' + name).set(true);
	  	  gardenMap.populate(userId, fb);
	  	});
	}
}