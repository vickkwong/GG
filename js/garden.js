function Garden(id, name) {
	this.garden = document.getElementById(id);
	this.name = name;
}

Garden.prototype.populate = function(fb, gardenId, userId) {
	var garden = this.garden;
	garden.innerHTML = '';
	fb.child('gardens/' + this.name).once('value', function(gardenSnap) {
	  var flowers = gardenSnap.val().flowers;
	  for(var flowerId in flowers) {
	  	// Container
	  	var flowerContainer = document.createElement('div');
	  	flowerContainer.className = "flower-container";
	  	flowerContainer.id = flowerId;

	  	// flowerId
	  	// gardenId
	  	// userId
	  	var flowerLink = document.createElement('a');
	  	flowerLink.href = "view_flower.html?gardenId=" + gardenId + "&flowerId=" + flowerId + "&userId=" + userId;
	  	// flowerLink.setAttribute("data-toggle", "modal");

	  	// Img
	  	var flowerImg = document.createElement('img');
	  	flowerImg.src = "img/gift.png";
	  	flowerImg.alt = "flower";

	  	// Append
	  	flowerLink.appendChild(flowerImg);
	  	flowerContainer.appendChild(flowerLink);
		garden.appendChild(flowerContainer);
	  }
	});
}

