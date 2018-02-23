import Expander from "./expander";
import Dropdown from "./dropdown";



// Variables

var defaults = {
	toggleSelector: "data-nav",
	openSelector: "data-nav-open",
	closeSelector: "data-nav-close",
	class: "nav",
	openClass: "",
	closedClass: "",
	openingClass: "",
	closingClass: "",
	transitionClass: "",
	mobile: {
		toggleSelector: "data-nav",
		openSelector: "data-nav-open",
		closeSelector: "data-nav-close",
		class: "expander",
		openClass: "expander--open",
		closedClass: "expander--closed",
		openingClass: "expander--opening",
		closingClass: "expander--closing",
		transitionClass: "expander--animating",
		onOpen: function(element) {},
		onClose: function(element) {}
	},
	desktop: {
		toggleSelector: "data-nav",
		class: "dropdown",
		openClass: "dropdown--open",
		closedClass: "dropdown--closed",
		openingClass: "dropdown--opening",
		closingClass: "dropdown--closing",
		reverseClass: "dropdown--reverse",
		transitionClass: "dropdown--animating",
		onOpen: function(element) {},
		onClose: function(element) {}
	},
	onEnable: function(element) {},
	onDisable: function(element) {},
	onModeChange: function(element, mode) {}
};




// Helper functions

// state = add/remove
function bindEvents(instance, state) {
	window[state + "EventListener"]("resize", instance._boundOnResize);
}



// Constructor

function Navigation(element, options) {
	if (typeof element === "string") element = document.querySelector(element);
	if (!element || !element.tagName) throw "Invalid selector/element";

	element.navigation = this;
	this.element = element;

	// Setup options
	var options = options || {};
	this.options = Object.assign({}, defaults, options);
	delete options.onEnable;
	delete options.onDisable;
	delete options.onModeChange;
	this.desktopOptions = Object.assign({}, defaults.desktop, options, options.desktop);
	this.mobileOptions = Object.assign({}, defaults.mobile, options, options.mobile);

	// Initiate the root level
	new Expander(this.element, this.mobileOptions);

	// Initiate the sublevels
	this.levels = this.element.querySelectorAll("." + this.options.class);
	for (var i = 0; i < this.levels.length; i++) {
		new Expander(this.levels[i], this.mobileOptions);
		new Dropdown(this.levels[i], this.desktopOptions);
	}

	// Create bound methods for event listeners
	this._boundOnResize = this.updateMode.bind(this);

	this.enable();
}



// Public methods

Navigation.prototype.enable = function() {
	this.enabled = 1;
	this.updateMode();

	this.options.onEnable.call(this, this.element);

	bindEvents(this, "add");
}



Navigation.prototype.disable = function() {
	this.enabled = 0;

	this.options.onDisable.call(this, this.element);

	bindEvents(this, "remove");
}



Navigation.prototype.getMode = function() {
	return window.getComputedStyle(document.body, ":before").content.replace(/"/g, '');
}



Navigation.prototype.updateMode = function() {
	var newMode = this.getMode();

	// If the mode changed
	if (newMode !== this.mode) {

		switch (newMode) {
			default:
			case "mobile":
				this.element.expander.setState("closed");
				this.element.expander.enable();
				var enable = "expander";
				var disable = "dropdown";
				break;

			case "desktop":
				this.element.expander.setState("open");
				this.element.expander.disable(1);
				var enable = "dropdown";
				var disable = "expander";
				break;
		}

		for (var i = 0; i < this.levels.length; i++) {
			this.levels[i][enable].enable();
			this.levels[i][enable].setState("closed");
			this.levels[i][disable].disable(1);
		}

		this.mode = newMode;

		this.options.onModeChange.call(this, this.element, newMode);
	}
}



export default Navigation;
