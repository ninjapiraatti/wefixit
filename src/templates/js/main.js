document.body.classList.add("js");

import SmoothScroll from "smoothscroll-polyfill";
import "./main-navigation";
import "./hanuri";
import Liukuri from 'liukuri';
import TouchClick from "./touchclick";

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
		new TouchClick(slidePager[i], slider.slide.bind(slidePager[i], slide, false));
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

	// Smooth scroll

	var siteHeader = document.querySelector('.site-header');
  var siteHeaderTimeout;
  var scrollLinks = document.querySelectorAll('[href^="#"]');
  for (var i = 0; i < scrollLinks.length; i++) {
    scrollLinks[i].addEventListener('click', function(event) {
      event.preventDefault();
      var target = document.querySelector(event.target.getAttribute('href'));
      window.scrollBy({
				top: target.getBoundingClientRect().top - 100,
        behavior: 'smooth'
      });
      if (siteHeader) {
        siteHeader.jemmaaja.disable();
        clearTimeout(siteHeaderTimeout);
        siteHeaderTimeout = setTimeout(function() {
          siteHeader.transform = 0;
          siteHeader.jemmaaja.enable();
        }, 1000);
      }
    });
  }

});
