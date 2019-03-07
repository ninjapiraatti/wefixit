export default function TouchClick(element, callback) {
	this.callback = callback;

	element.addEventListener("click", onClick);
	element.addEventListener("mousedown", this.onPointerDown.bind(this));
	element.addEventListener("touchstart", this.onPointerDown.bind(this));

	this.pointerUpEvent = this.onPointerUp.bind(this);
	this.pointerMoveEvent = this.onPointerMove.bind(this);
}



function onClick(event) {
	event.preventDefault();
}



TouchClick.prototype.onPointerDown = function(event) {
	var touches = event.touches;

	// Get the coordinates
	if (event.type == "touchstart") {
		this.startx = touches[0].clientX;
		this.starty = touches[0].clientY;
	} else {
		// Only track left mouse click
		if (event.which == 1) {
			this.startx = event.clientX;
			this.starty = event.clientY;
		}
	}

	if (this.startx) {
		document.body.addEventListener("mouseup", this.pointerUpEvent);
		document.body.addEventListener("touchend", this.pointerUpEvent);
		document.body.addEventListener("mousemove", this.pointerMoveEvent);
		document.body.addEventListener("touchmove", this.pointerMoveEvent);
	}
}



TouchClick.prototype.onPointerMove = function(event) {
	// Get the coordinates
	if (event.type == "touchmove") {
		var touches = event.touches;
		var x = touches[0].clientX;
		var y = touches[0].clientY;
	} else {
		var x = event.clientX;
		var y = event.clientY;
	}

	// If we are not dragging
	if (!this.pointerMoved) {
		var dx = Math.abs(x - this.startx);
		var dy = Math.abs(y - this.starty);

		// If the pointer is moving too far
		if (dx > 10 || dy > 10) {
			this.pointerMoved = true;
		}
	}
}



TouchClick.prototype.onPointerUp = function(event) {
	if (!this.pointerMoved) this.callback(event);

	// Remove pointer move event listeners
	document.body.removeEventListener("mouseup", this.pointerUpEvent);
	document.body.removeEventListener("touchend", this.pointerUpEvent);
	document.body.removeEventListener("mousemove", this.pointerMoveEvent);
	document.body.removeEventListener("touchmove", this.pointerMoveEvent);

	// Reset pointer related variables
	this.startx = this.starty = this.pointerMoved = null;
}

