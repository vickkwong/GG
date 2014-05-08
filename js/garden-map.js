function GardenMap(id) {
	this.gardenMap = document.getElementById(id);
}

GardenMap.prototype.populate = function(userId, fb) {
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
