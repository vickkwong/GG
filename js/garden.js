function Garden(id, name) {
	this.garden = document.getElementById(id);
	this.name = name;
}

Garden.prototype.populate = function(fb) {
	var garden = this.garden;
	garden.innerHTML = '';
	fb.child('gardens/' + this.name).once('value', function(gardenSnap) {
	  var flowers = gardenSnap.val().flowers;
	  for(var flowerId in flowers) {
	  	// Container
	  	var flowerContainer = document.createElement('div');
	  	flowerContainer.className = "flower-container";
	  	flowerContainer.id = flowerId;

	  	// Img
	  	var flowerImg = document.createElement('img');
	  	flowerImg.src = "img/flower1.png";
	  	flowerImg.alt = "flower";

	  	// Append
	  	flowerContainer.appendChild(flowerImg);
		garden.appendChild(flowerContainer);
	  }
	});
}

