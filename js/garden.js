function Garden(id, name) {
	this.gardenTable = document.getElementById(id);
	this.name = name;
}

Garden.prototype.populate = function(fb, gardenId, userId) {
	var garden = this.gardenTable;
	garden.innerHTML = '';
	fb.child('gardens/' + this.name).once('value', function(gardenSnap) {
	  var flowers = gardenSnap.val().flowers;
	  var count = 0;
	  var row;
	  for(var flowerId in flowers) {
	  	if (count%4 == 0) {
	  		row = document.createElement("tr");
	  	}

	  	var tableData = document.createElement("td");

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
	  	flowerImg.className = "gift-img";
	  	flowerImg.src = "img/gift.png";
	  	flowerImg.alt = "flower";

	  	// Des
	  	var flowerDes = document.createElement("p");
	  	flowerDes.innerHTML = flowers[flowerId].description;

	  	// Append
	  	flowerLink.appendChild(flowerImg);
	  	flowerContainer.appendChild(flowerLink);
	  	flowerContainer.appendChild(flowerDes);

	  	tableData.appendChild(flowerContainer);
	  	row.appendChild(tableData);

	  	if (count%4 == 0) {
	  		garden.appendChild(row);
	  	}
	  	count ++;
		//garden.appendChild(flowerContainer);
	  }

	});
}

