var Liukuri = (function () {
'use strict';

function getElements(selector, element) {
	var element = element || document;
	return element.querySelectorAll(selector);
}

function getElement(selector, element) {
	return getElements(selector, element)[0];
}

function forEach(array, callback, scope) {
	for (var i = 0; i < array.length; i++) {
		callback.call(scope, array[i], i);
	}
}

function hasClass(element, className) {
	return element.classList.contains(className);
}

function addClass(element, className) {
	element.classList.add(className);
}

function removeClass(element, className) {
	element.classList.remove(className);
}

function setStyle(element, style, value) {
	element.style[style] = value;
}

function addEvent(element, event, callback, useCapture) {
	element.addEventListener(event, callback, useCapture);
}

function removeEvent(element, event, callback, useCapture) {
	element.removeEventListener(event, callback, useCapture);
}

function preventDefault(event) {
	event.preventDefault();
}

function asArray(arrayLikeObject) {
	return Array.prototype.slice.call(arrayLikeObject);
}

function bind(fn, scope) {
	return fn.bind.apply(fn, [scope].concat(asArray(arguments).slice(2)));
}

function rAF(fn) {
	return window.requestAnimationFrame(fn);
}

function delayed(callback, frames) {
	frames--;
	window.requestAnimationFrame(frames > 0 ? function() {
		delayed(callback, frames);
	} : callback);
}

function setCookie(name, value, days) {
	var d = new Date;
	d.setTime(d.getTime() + 24*60*60*1000*days);
	document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

function getAncestor(element, classToFind, stop) {
	stop = stop || body;
	for (element; element != stop; element = element.parentNode) {
		if (hasClass(element, classToFind)) {
			break;
		}
	}

	if (element != stop) return element;
}



// Variables

var win = window;
var doc = document;
var body = doc.body;

var sliderClass = "slider";
var sliderFreeClass = sliderClass + "--free";
var slideClass = sliderClass + "__slide";
var currentSlideClass = slideClass + "--current";
var instantClass = sliderClass + "--instant";
var buttonClass = sliderClass + "-nav";
var buttonPrevClass = buttonClass + "--prev";
var buttonNextClass = buttonClass + "--next";

var sliderSelector = "." + sliderClass;
var currentSlideSelector = "." + currentSlideClass;

var eventsAttached;

var pointerStartX;
var pointerStartY;
var pointerX;
var pointerY;
var pointerDX;
var pointerDY;
var pointerMoved;
var pointerMoveEvent;

var dragging;
var dragElement;

var momentumTimer;
var momentumTracker = [];

var dragTick;
var resizeTick;

var liukuriOptions = {};
var defaults = {
	dynamicHeight: false,
	goAround: false,
	mouseDrag: false,
	threshold: 0.25,
	pxThreshold: 100,
	onInit: function() {},
	onSlideChange: function() {},
	onDragStart: function() {},
	onDrag: function() {},
	onDragEnd: function() {}
};



// Private functions

function setupLiukuri(element, opts) {
	opts = opts || {};

	// Initiate a slider only once
	if (!element.isLiukuri) {
		element.isLiukuri = true;

		// Attach event listeners if they are not there yet
		if (!eventsAttached) attachEvents();

		// Setup and store the slider's options
		var options = {};
		for (var i in defaults) options[i] = defaults[i];
		for (var i in opts) options[i] = opts[i];
		liukuriOptions[""+element.id] = options;

		slide(element, options.startAt || 0, true);

		updateHeight(element);

		// Set the public functions for the slider
		element.slide = bind(slide, element, element);

		// Init callback
		options.onInit();
	}

	// Return the slider element
	return element;
}



function attachEvents() {
	// Attach events
	addEvent(body, "click", onClick);
	addEvent(body, "mousedown", onPointerDown);
	addEvent(body, "touchstart", onPointerDown);
	addEvent(body, "mouseup", onPointerUp);
	addEvent(body, "touchend", onPointerUp);
	addEvent(win, "resize", onResize);
	addEvent(body, "load", onImageLoad, true);

	// A binded event for later use
	pointerMoveEvent = onPointerMove.bind(this);

	eventsAttached = true;
}



function onResize(event) {
	if (!resizeTick) resizeTick = rAF(updateHeights);
}



function onImageLoad(event) {
	var target = event.target;
	if (target.tagName == "IMG") {
		var slider = getAncestor(target, sliderClass);
		if (slider) updateHeight(slider);
	}
}



function onClick(event) {
	var target = event.target;

	if (hasClass(target, buttonClass)) {
		preventDefault(event);
	}
}



function onPointerDown(event) {
	var target = event.target;
	var touches = event.touches;

	// Get the coordinates
	if (event.type == "touchstart") {
		pointerStartX = touches[0].clientX;
		pointerStartY = touches[0].clientY;
	} else {
		// Only track left mouse click
		if (event.which == 1) {
			pointerStartX = event.clientX;
			pointerStartY = event.clientY;
		}
	}

	// If we should start dragging
	if (pointerStartX) {
		dragElement = getAncestor(target, sliderClass);
		if (dragElement) {
			// Add pointer move event listeners only on touch or if mouse dragging is enables
			if (touches || liukuriOptions[dragElement.id].mouseDrag) {
				addEvent(body, "mousemove", pointerMoveEvent);
				addEvent(body, "touchmove", pointerMoveEvent);
			}
		}
	}
}



function onPointerMove(event) {
	// Get the coordinates
	if (event.type == "touchmove") {
		var touches = event.touches;
		pointerX = touches[0].clientX;
		pointerY = touches[0].clientY;
	} else {
		pointerX = event.clientX;
		pointerY = event.clientY;
	}

	// Update drag distance
	pointerDX = pointerX - pointerStartX;
	pointerDY = pointerY - pointerStartY;

	// If we are not dragging
	if (!pointerMoved) {
		var nDX = Math.abs(pointerDX);
		var nDY = Math.abs(pointerDY);

		// If the pointer is moving too far
		if (nDX > 10 || nDY > 10) {
			pointerMoved = true;
			// Horizontal movement = dragging
			if (nDX > nDY) {
				sliderDragStart();
			}
		}
	}

	if (dragging) {
		// Prevent scrolling on mobile devices
		preventDefault(event);

		// Visualize the drag
		if (!dragTick) dragTick = rAF(sliderDrag);
	}
}



function onPointerUp(event) {
	var target = event.target;

	// If a button was clicked/tapped
	if (!pointerMoved && hasClass(target, buttonClass)) {
		preventDefault(event);
		clickButton(target);

		// If we are dragging a slider
	} else if (dragging) {
		sliderDragStop();
	}

	// Remove pointer move event listeners
	removeEvent(body, "mousemove", pointerMoveEvent);
	removeEvent(body, "touchmove", pointerMoveEvent);

	// Reset pointer related variables
	pointerStartX =
	pointerStartY =
	pointerX =
	pointerY =
	pointerDX =
	pointerDY =
	pointerMoved = null;
}



function clickButton(button) {
	// Find the slider to control
	var slider = getElement("#" + button.dataset.slider);

	if (slider) {
		var direction;

		// Was it a next or prev?
		if (hasClass(button, buttonPrevClass)) direction = "prev";
		else if (hasClass(button, buttonNextClass)) direction = "next";

		if (direction) slide(slider, direction);
	}
}



function sliderDragStart() {
	dragging = true;

	// Add free floating class to the slider
	addClass(dragElement, sliderFreeClass);

	// Start tracking the momentum
	momentumTimer = setInterval(trackMomentum, 10);

	// DragStart callback
	liukuriOptions[dragElement.id].onDragStart(dragElement);
}



function sliderDrag() {
	dragTick = null;
	if (dragElement && pointerDX) {
		setTransform(dragElement, "calc(" + dragElement.translateX + " + " + pointerDX + "px)");

		// Drag callback
		liukuriOptions[dragElement.id].onDrag(dragElement, pointerDX);
	}
}



function sliderDragStop() {
	var direction;

	// Remove free floating class from the slider
	removeClass(dragElement, sliderFreeClass);

	// Calculate total drag distance
	var momentum = calculateMomentum();
	var totalDrag = pointerDX + momentum;

	var sliderWidth = dragElement.offsetWidth;

	// If the drag was long enough, change the slide
	if (Math.abs(totalDrag) > Math.min(sliderWidth * liukuriOptions[dragElement.id].threshold, liukuriOptions[dragElement.id].pxThreshold)) {
		direction = totalDrag > 0 ? "prev" : "next";

		// If we have momentum, calculate new transition time and change easing to ease-out
		if (momentum) {
			var transitionTime = Math.min(250, (sliderWidth - Math.abs(pointerDX)) / Math.abs(momentum) * 100);
			setStyle(dragElement, "transition", "transform " + transitionTime + "ms ease-out");

			// Reset transition when ready
			var element = dragElement;
			setTimeout(function() {
				setStyle(element, "transition", "");
			}, transitionTime);
		}
	}

	slide(dragElement, direction);

	// DragEnd callback
	liukuriOptions[dragElement.id].onDragEnd(dragElement, direction);

	// Clear momentum tracker
	clearInterval(momentumTimer);
	momentumTracker = [];

	// Reset drag variables
	dragElement = dragging = null;
}



function trackMomentum() {
	momentumTracker.push(pointerX);
	if (momentumTracker.length > 10) momentumTracker.shift();
}



function calculateMomentum() {
	return momentumTracker[momentumTracker.length - 1] - momentumTracker[0];
}



function setTransform(slider, translateX) {
	translateX = "translateX(" + translateX + ")";
	var property = "transform";
	setStyle(slider, property, translateX);
	setStyle(slider, "-webkit-" + property, translateX);
}



function updateHeights() {
	// This is called on resize, so nullify the rAF ticker
	resizeTick = null;

	var sliders = getElements(sliderSelector);
	forEach(sliders, function(slider) {
		updateHeight(slider);
	});
}



function updateHeight(slider) {
	if (!slider) {
		updateHeights();
	} else {
		if (liukuriOptions[slider.id].dynamicHeight) {
			var currentSlide = getElement(currentSlideSelector, slider);
			setStyle(slider, "height", currentSlide.offsetHeight + "px");
		}
	}
}



function slideAround(slider, direction) {
	var aroundClass = sliderClass + "--around-" + direction;
	addClass(slider, aroundClass);
	setTimeout(function() {
		removeClass(slider, aroundClass);
	}, 250);

	var slides = slider.children;
	return slides[direction == "next" ? 0 : slides.length - 1];
}



function slide(slider, slide, instant) {
	var index;
	var newSlide;
	var slides = slider.children;

	if (slider && hasClass(slider, sliderClass)) {
		var oldSlide = getElement(currentSlideSelector, slider);

		// Is the slide given an index?
		index = +slide;
		if (!isNaN(index)) {
			newSlide = slides[index];
		} else {
			// If not, it should be next or prev
			switch (slide) {
				case "prev":
				newSlide = oldSlide.previousElementSibling;
				break;
				case "next":
				newSlide = oldSlide.nextElementSibling;
				break;
			}

			// If it was the first / last slide, go around
			if (!newSlide && liukuriOptions[slider.id].goAround) {
				newSlide = slideAround(slider, slide);
				instant = true;
			}

			// Get the index of the new slide
			index = asArray(slides).indexOf(newSlide);
		}

		if (newSlide && hasClass(newSlide, slideClass)) {
			// If the slide changed
			if (oldSlide !== newSlide) {
				// Swap current slide class from the old slide to the new one
				if (oldSlide) removeClass(oldSlide, currentSlideClass);
				addClass(newSlide, currentSlideClass);

				updateHeight(slider);

				// Update translateX
				slider.translateX = index * -100 + "%";
			}
		}

		// Remove the transition if the change should be instant
		if (instant) {
			addClass(slider, instantClass);

			setTimeout(function() {
				removeClass(slider, instantClass);
			}, 300);
		}

		// Set translateX
		setTransform(slider, slider.translateX);

		// SlideChange callback
		liukuriOptions[slider.id].onSlideChange(slider, newSlide, oldSlide);
	}
}



// Constructor

function Liukuri(element, options) {
	if (typeof element === "string") element = getElement(element);

	if (element && element.tagName) {
		return setupLiukuri(element, options);
	} else {
		throw "Liukuri: Invalid selector/element";
	}
}

return Liukuri;

}());
