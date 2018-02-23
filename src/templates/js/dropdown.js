// Variables

var defaults = {
	toggleSelector: "data-dropdown",
	class: "dropdown",
	openClass: "dropdown--open",
	closedClass: "dropdown--closed",
	openingClass: "dropdown--opening",
	closingClass: "dropdown--closing",
	reverseClass: "dropdown--reverse",
	transitionClass: "dropdown--animating",
	state: "closed",
	onEnable: function(element) {},
	onDisable: function(element) {},
	onOpen: function(element) {},
	onClose: function(element) {}
};

var instances = [];
var instancesToKeepOpen = [];

var keepOpenHandlerActive = 0;
var keepOpenHandler = function(event) {
	for (var i = 0; i < instances.length; i++) {
		if (instances[i].enabled && instancesToKeepOpen.indexOf(instances[i]) < 0) {
			instances[i].close();
		}
	}

	instancesToKeepOpen = [];
};



// Helper functions

// state = add/remove
function bindEvents(instance, state) {
	instance.element[state + "EventListener"]("transitionend", instance._boundTransitionend);

	// Keep open the dropdowns that have been clicked
	instance.element[state + "EventListener"]("click", instance._boundKeepOpen, true);

	if (instances.length) {
		if (!keepOpenHandlerActive) {
			document.addEventListener("click", keepOpenHandler);
			keepOpenHandlerActive = 1;
		}
	} else {
		if (keepOpenHandlerActive) {
			document.removeEventListener("click", keepOpenHandler);
			keepOpenHandlerActive = 0;
		}
	}

	// Toggle buttons
	if (instance.options.toggleSelector) {
		var toggles = document.querySelectorAll("[" + instance.options.toggleSelector + "=" + instance.element.id + "]");
		for (var i = 0; i < toggles.length; i++) toggles[i][state + "EventListener"]("click", instance._boundClickToggle);
	}
}



function keepOpen(instance) {
	instancesToKeepOpen.push(instance);
}



function onClickToggle(event) {
	event.preventDefault();
	keepOpen(this);
	this.toggle();
}



function startTransition(instance, phase) {
	phase = phase || 1;
	switch (phase) {
		case 1:
			instance.element.classList.add(instance.options.transitionClass);
			instance.element.setAttribute("aria-hidden", false);
			setDirection(instance);
			window.requestAnimationFrame(startTransition.bind(this, instance, ++phase));
			break;

		case 2:
			instance.element.classList.remove(instance.options[instance.state == "closed" ? "closedClass" : "openClass"]);
			window.requestAnimationFrame(startTransition.bind(this, instance, ++phase));
			break;

		case 3:
			instance.setState(instance.state == "closed" ? "opening" : "closing");
			break;
	}
}



function onTransitionend(event) {
	switch (this.state) {
		case "opening":
			this.setState("open");
			break;
		case "closing":
			this.setState("closed");
			break;
	}
}



function setDirection(instance) {
	instance.element.classList.remove(instance.options.reverseClass);
	var rect = instance.element.getBoundingClientRect();
	if (rect.right > window.innerWidth - 5) {
		instance.element.classList.add(instance.options.reverseClass);
	}
}



// Constructor

function Dropdown(element, options) {
	if (typeof element === "string") element = document.querySelector(element);
	if (!element || !element.tagName) throw "Invalid selector/element";

	if (element.dropdown) return;

	element.dropdown = this;
	this.element = element;

	// Setup options
	this.options = Object.assign({}, defaults, options);

	// Create bound methods for event listeners
	this._boundClickToggle = onClickToggle.bind(this);
	this._boundTransitionend = onTransitionend.bind(this);
	this._boundKeepOpen = keepOpen.bind(this, this);

	this.setState(this.options.state);
	delete this.options.state;

	this.enable();
}



// Public methods

Dropdown.prototype.enable = function() {
	if (this.enabled) return;

	this.enabled = 1;
	this.options.onEnable.call(this, this.element);

	instances.push(this);

	this.element.classList.add(this.options.class);

	bindEvents(this, "add");
}



Dropdown.prototype.disable = function(classes) {
	if (!this.enabled) return;

	this.enabled = 0;
	this.options.onDisable.call(this, this.element);

	instances.splice(instances.indexOf(this), 1);

	if (classes) {
		this.element.classList.remove(this.options.class);
		this.element.classList.remove(this.options.openClass);
		this.element.classList.remove(this.options.closedClass);
		this.element.classList.remove(this.options.openingClass);
		this.element.classList.remove(this.options.closingClass);
		this.element.classList.remove(this.options.transitionClass);
		this.element.classList.remove(this.options.reverseClass);
	}

	bindEvents(this, "remove");
}



Dropdown.prototype.toggle = function() {
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



Dropdown.prototype.open = function() {
	if (this.state == "open" || this.state == "opening") return;
	this.setState("opening");
};



Dropdown.prototype.close = function() {
	if (this.state == "closed" || this.state == "closing") return;
	this.setState("closing");
};



Dropdown.prototype.setState = function(state) {
	switch (state) {
		case "open":
			this.element.setAttribute("aria-hidden", false);
			this.element.classList.add(this.options.openClass);
			this.element.classList.remove(this.options.openingClass);
			this.element.classList.remove(this.options.closedClass);
			this.element.classList.remove(this.options.transitionClass);
			this.options.onOpen.call(this, this.element);
			break;

		case "closed":
			this.element.setAttribute("aria-hidden", true);
			this.element.classList.add(this.options.closedClass);
			this.element.classList.remove(this.options.closingClass);
			this.element.classList.remove(this.options.openClass);
			this.element.classList.remove(this.options.transitionClass);
			this.element.classList.remove(this.options.reverseClass);
			this.options.onClose.call(this, this.element);
			break;

		case "opening":
			// If the element is not transitioning yet, do it now
			if (!this.element.classList.contains(this.options.transitionClass)) {
				startTransition(this);
				return;
			}
			this.element.classList.add(this.options.openingClass);
			this.element.classList.remove(this.options.closingClass);
			break;

		case "closing":
			// If the element is not transitioning yet, do it now
			if (!this.element.classList.contains(this.options.transitionClass)) {
				startTransition(this);
				return;
			}
			this.element.classList.add(this.options.closingClass);
			this.element.classList.remove(this.options.openingClass);
			break;

		default:
			throw "Invalid state: " + state;
	}

	this.state = state;
};



export default Dropdown;
