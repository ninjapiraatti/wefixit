// Hide navbar on scroll
import Jemmaaja from "jemmaaja";
var siteHeader = new Jemmaaja(".site-header", {
	min: -72
});

// If there is a hash in the url, scroll back a bit so the navbar doesn't block view
if (window.location.hash) {
	window.requestAnimationFrame(function() {
		if (window.scrollY == document.querySelector(window.location.hash).offsetTop) {
			window.scrollBy(0, -72);
		}
	});
}

// Add dropdown-button class to nav links with submenus
// and link them to the actual menus
var navDropdowns = document.querySelectorAll("[id^=main-nav-]");
for (var i = 0; i < navDropdowns.length; i++) {
	var trigger = navDropdowns[i].previousElementSibling;
	trigger.classList.add("dropdown-button");
	trigger.dataset.nav = navDropdowns[i].id;
}

// Load and initiate the navigation
import Navigation from "./navigation";
if (document.querySelector("#main-nav")) {
	var nav = new Navigation("#main-nav");
}
