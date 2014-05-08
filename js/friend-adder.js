function FriendAdder(id, errorId, successId, gardenName) {
	this.friendAdder = document.getElementById(id);
	this.errorMsg = document.getElementById(errorId);
	this.successMsg = document.getElementById(successId);
	this.gardenName = gardenName;
	this.errorMsg.style.display = 'none';
	this.successMsg.style.display = 'none';
}

FriendAdder.prototype.showMessage = function(msg, success) {
	if (success) {
		this.successMsg.innerHTML = msg;
		this.successMsg.style.display = 'block';
		this.errorMsg.style.display = 'none';
	} else {
		this.errorMsg.innerHTML = msg;
		this.successMsg.style.display = 'none';
		this.errorMsg.style.display = 'block';
	}
	this.friendAdder.value = '';
}

FriendAdder.prototype.addFriendToDB = function(id, name, fb) {
	fb.child('gardens/' + this.gardenName + '/users/'+ id).set(true);
	this.showMessage(name + " was added!", true); 
}

FriendAdder.prototype.friendExists = function(name, fb) {
	friendAdder = this;
  	fb.child('users').once('value', function(usrs){
		var users = usrs.val();
		for(var usr in users) {
			console.log(users[usr].username);
	  		if(users[usr].username == name) {
	  			friendAdder.addFriendToDB(usr, name, fb);
	  			return;
	  	    }
  		}
  		friendAdder.showMessage(name + " does not exist", false);
  	});
}

FriendAdder.prototype.searchFriend = function(gardenName, fb) {
	var friendName = this.friendAdder.value;
	if (friendName == "") {
		this.showMessage("Please enter a friend's name", false);
	} else {
		this.friendExists(friendName, fb);
	}
}

