document.body.classList.add("js");

import SmoothScroll from "smoothscroll-polyfill";
import "./main-navigation";
import "./hanuri";
import Isotope from 'isotope-layout';
import matchesSelector from 'desandro-matches-selector/matches-selector';
import Liukuri from 'liukuri';

var pricingSlider = document.querySelector('#pricing-slider');
if (pricingSlider) {
	new Liukuri(pricingSlider, {
		dynamicHeight: true,
		onSlideChange: function(slider, newSlide, oldSlide) {
			var oldIndex = Array.prototype.slice.call(slider.children).indexOf(oldSlide);
			var newIndex = Array.prototype.slice.call(slider.children).indexOf(newSlide);

			var oldPager = document.querySelector('.slider-nav[data-slider="'+slider.id+'"][data-slide="'+oldIndex+'"]');
			var newPager = document.querySelector('.slider-nav[data-slider="'+slider.id+'"][data-slide="'+newIndex+'"]');

			if (oldPager) oldPager.classList.remove('active');
			if (newPager) newPager.classList.add('active');
		}
	});

	var slidePager = document.querySelectorAll('.slider-nav[data-slide]');
	for (var i = 0; i < slidePager.length; i++) {
		var slider = document.querySelector('#' + slidePager[i].getAttribute('data-slider'));
		var slide = parseInt(slidePager[i].getAttribute('data-slide'));
		slidePager[i].addEventListener('click', slider.slide.bind(slidePager[i], slide, false));
	}
}

SmoothScroll.polyfill();


document.addEventListener('DOMContentLoaded', function() {

  var win = window;
	var doc = document;
	var body = doc.body;

	var httpRequest = new XMLHttpRequest();

  // Helpers

  var hasClass = function(element, className) {
        return element.classList.contains(className);
    };

  var addClass = function(element, className) {
      element.classList.add(className);
  };

  var removeClass = function(element, className) {
      element.classList.remove(className);
  };

	var getAttribute = function(element, attr) {
      return element.getAttribute(attr);
  };

	var setAttribute = function(element, attr, value) {
      element.setAttribute(attr, value);
  };

	var addEvent = function(element, event, callback) {
      element.addEventListener(event, callback);
  };

	var removeEvent = function(element, event, callback) {
      element.removeEventListener(event, callback);
  };

	var getElements = function(selector, element) {
      element = element || document;
      return Array.prototype.slice.call(element.querySelectorAll(selector));
  };

	var getElement = function(selector, element) {
      return getElements(selector, element)[0];
  };

  var forEach = function(array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
          callback.call(scope, array[i], i);
      }
  };

  //navipalikka();

});
