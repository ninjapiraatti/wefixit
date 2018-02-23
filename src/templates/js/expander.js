// Variables

var defaults = {
	toggleSelector: "data-expander",
	openSelector: "data-expander-open",
	closeSelector: "data-expander-close",
	class: "expander",
	openClass: "expander--open",
	closedClass: "expander--closed",
	openingClass: "expander--opening",
	closingClass: "expander--closing",
	transitionClass: "expander--animating",
	state: "closed",
	onEnable: function(element) {},
	onDisable: function(element) {},
	onOpen: function(element) {},
	onClose: function(element) {}
};




// Helper functions

// state = add/remove
function bindEvents(instance, state) {
	instance.element[state + "EventListener"]("transitionend", instance._boundTransitionend);

	// Toggle buttons
	if (instance.options.toggleSelector) {
		var toggles = document.querySelectorAll("[" + instance.options.toggleSelector + "=" + instance.element.id + "]");
		for (var i = 0; i < toggles.length; i++) toggles[i][state + "EventListener"]("click", instance._boundToggle);
	}

	// Open buttons
	if (instance.options.openSelector) {
		var openers = document.querySelectorAll("[" + instance.options.openSelector + "=" + instance.element.id + "]");
		for (var i = 0; i < openers.length; i++) openers[i][state + "EventListener"]("click", instance._boundOpen);
	}

	// Close buttons
	if (instance.options.closeSelector) {
		var closers = document.querySelectorAll("[" + instance.options.closeSelector + "=" + instance.element.id + "]");
		for (var i = 0; i < closers.length; i++) closers[i][state + "EventListener"]("click", instance._boundClose);
	}
}



function startTransition(instance, phase) {
	phase = phase || 1;
	switch (phase) {
		case 1:
			if (instance.state == "closed") {
				instance.element.style.height = "0px";
				instance.element.setAttribute("aria-hidden", false);
			} else {
				instance.element.style.height = instance.calculateHeight() + "px";
			}
			window.requestAnimationFrame(startTransition.bind(this, instance, ++phase));
			break;

		case 2:
			instance.element.classList.add(instance.options.transitionClass);
			window.requestAnimationFrame(startTransition.bind(this, instance, ++phase));
			break;

		case 3:
			instance.element.classList.remove(instance.options[instance.state == "closed" ? "closedClass" : "openClass"]);
			window.requestAnimationFrame(startTransition.bind(this, instance, ++phase));
			break;

		case 4:
			instance.setState(instance.state == "closed" ? "opening" : "closing");
			break;
	}
}



function onTransitionend() {
	switch (this.state) {
		case "opening":
			this.setState("open");
			break;
		case "closing":
			this.setState("closed");
			break;
	}
}



// Constructor

function Expander(element, options) {
	if (typeof element === "string") element = document.querySelector(element);
	if (!element || !element.tagName) throw "Invalid selector/element";

	if (element.expander) return;

	element.expander = this;
	this.element = element;

	// Setup options
	this.options = Object.assign({}, defaults, options);

	// Create bound methods for event listeners
	this._boundToggle = this.toggle.bind(this);
	this._boundOpen = this.open.bind(this);
	this._boundClose = this.close.bind(this);
	this._boundTransitionend = onTransitionend.bind(this);

	this.setState(this.options.state);
	delete this.options.state;

	this.enable();
}



// Public methods

Expander.prototype.enable = function() {
	if (this.enabled) return;

	this.enabled = 1;
	this.options.onEnable.call(this, this.element);

	this.element.classList.add(this.options.class);

	bindEvents(this, "add");
}



Expander.prototype.disable = function(classes) {
	if (!this.enabled) return;

	this.enabled = 0;
	this.options.onDisable.call(this, this.element);

	if (classes) {
		this.element.classList.remove(this.options.class);
		this.element.classList.remove(this.options.openClass);
		this.element.classList.remove(this.options.closedClass);
		this.element.classList.remove(this.options.openingClass);
		this.element.classList.remove(this.options.closingClass);
		this.element.classList.remove(this.options.transitionClass);
	}

	bindEvents(this, "remove");
}



Expander.prototype.toggle = function(event) {
	if (event) event.preventDefault();

	switch (this.state) {
		case "open":
		case "opening":
			this.setState("closing");
			break;

		case "closed":
		case "closing":
			this.setState("opening");
			break;
	}
};



Expander.prototype.open = function(event) {
	if (event) event.preventDefault();
	this.setState("opening");
};



Expander.prototype.close = function(event) {
	if (event) event.preventDefault();
	this.setState("closing");
};



Expander.prototype.setState = function(state) {
	switch (state) {
		case "open":
			this.element.setAttribute("aria-hidden", false);
			this.element.classList.add(this.options.openClass);
			this.element.classList.remove(this.options.openingClass);
			this.element.classList.remove(this.options.closedClass);
			this.element.classList.remove(this.options.transitionClass);
			this.element.style.height = "";
			break;

		case "closed":
			this.element.setAttribute("aria-hidden", true);
			this.element.classList.add(this.options.closedClass);
			this.element.classList.remove(this.options.closingClass);
			this.element.classList.remove(this.options.openClass);
			this.element.classList.remove(this.options.transitionClass);
			this.element.style.height = "";
			break;

		case "opening":
			// If the element is not transitioning yet, do it now
			if (!this.element.classList.contains(this.options.transitionClass)) {
				startTransition(this);
				return;
			}
			this.element.classList.add(this.options.openingClass);
			this.element.classList.remove(this.options.closingClass);
			this.element.style.height = this.calculateHeight() + "px";
			this.options.onOpen.call(this, this.element);
			break;

		case "closing":
			// If the element is not transitioning yet, do it now
			if (!this.element.classList.contains(this.options.transitionClass)) {
				startTransition(this);
				return;
			}
			this.element.classList.add(this.options.closingClass);
			this.element.classList.remove(this.options.openingClass);
			this.element.style.height = 0;
			this.options.onClose.call(this, this.element);
			break;

		default:
			throw "Invalid state: " + state;
	}

	this.state = state;
};



Expander.prototype.calculateHeight = function() {
	// Find the first visible element
	var first = this.element.firstElementChild;
	while (!first.getClientRects().length && first.nextElementSibling) first = first.nextElementSibling;

	// Find the last visible element
	var last = this.element.lastElementChild;
	while (!last.getClientRects().length && last !== first && last.previousElementSibling) last = last.previousElementSibling;

	// Figure out and set the height of the element
	var top = first.getBoundingClientRect().top;
	var bottom = last.getBoundingClientRect().bottom;

	return bottom - top;
}



export default Expander;
