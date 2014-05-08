/**
 * Constructor for MagicIframe.  This class can be used for when both the user is
 * planting a new flower and when the user is viewing an existing flower.  If it's
 * the latter case, the last two parameters are optional.
 * 
 * @param {string} id The iframe's id
 * @param {string} containerId The iframe's container's id
 * @param {string} [urlInputId] The URL input's id
 * @param {string} [descriptionId] The description input's id
 */
function MagicIframe(id, containerId, urlInputId, descriptionId) {
	// Get all the necessary elements
	this.iframe = document.getElementById(id);
	this.container = document.getElementById(containerId);
	if(typeof urlInputId !== "undefined") {
		this.urlInput = document.getElementById(urlInputId);
		this.descriptionForm = document.getElementById(descriptionId);
		// Hide the iframe & description until ready
		this.container.style.display = 'none';
		this.descriptionForm.style.display = 'none';
	}
}

/**
 * Loads content into the iframe.  If this is the case where the user is
 * planting a new flower, don't pass any parameters in.  If this is the case
 * where the user is viewing an existing flower, pass in the url of the content
 * and the # of pixels that should be scrolled down.
 * 
 * @param {string} [url] The url of the content that should be loaded.
 * @param {integer} [pixels] The number of pixels that should be scrolled down
 */
MagicIframe.prototype.loadSrc = function(url, pixels) {
	if (typeof url === "undefined") {
		url = this.urlInput.value;
		pixels = 0;
		this.container.style.display = 'block';
		this.descriptionForm.style.display = 'block';
	}
	var dummyURL = "file:///Users/victoriakwong/Documents/CS247/GG/dummy.html?url=" + url + "&pixels=" + pixels;
	this.iframe.src = dummyURL;
}

/**
 * Saves iframe data (url, pixels, and description) to the DB.  Refreshes the form.
 * This should only be called in the case where the user is planting a new flower.
 */
MagicIframe.prototype.save = function() {
	var url = this.urlInput.value;
	var pixels = this.container.scrollTop;
	var description = this.descriptionForm.value;
	
	console.log("POST to database");
	console.log("url: " + url);
	console.log("pixels: " + pixels);
	console.log("description: " + description);

	// Refresh everything
	this.urlInput.value = "";
	this.iframe.src = "";
	this.descriptionForm.value = "";
	this.container.style.display = 'none';
	this.descriptionForm.style.display = 'none';
}


