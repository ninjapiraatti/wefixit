(function(document, window) {

    'use strict';

    var responsiveNav = function(opts) {

        // Helper functions

        var hasClass = function(element, className) {
            return element.classList.contains(className);
        };

        var addClass = function(element, className) {
            element.classList.add(className);
        };

        var removeClass = function(element, className) {
            element.classList.remove(className);
        };

        var addEvent = function(element, event, callback) {
            element.addEventListener(event, callback);
        };

        var getElements = function(selector, element) {
            element = element || document;
            return element.querySelectorAll(selector);
        };

        var forEach = function(array, callback, scope) {
            for (var i = 0; i < array.length; i++) {
                callback.call(scope, i, array[i]);
            }
        };

        var delayed = function(callback, frames) {
            frames--;
            if (frames > 0) {
                window.requestAnimationFrame(function() {delayed(callback, frames);});
            } else {
                window.requestAnimationFrame(callback);
            }
        };



        // Variables

        var nav,
            navToggle,
            wrapper,
            options,
            mode,
            touchStartX,
            touchStartY,
            touchMoved;




        // Private functions

        var init = function() {
            addClass(document.body, 'js');

            nav = getElements('.' + options.container)[0];
            navToggle = getElements('.' + options.container + '-toggle')[0];
            wrapper = nav.parentNode;

            addClass(nav, options.collapsed);
            addClass(navToggle, options.toggle);
            addClass(navToggle, options.collapsed);

            var dropdowns = getElements('.' + options.dropdown + ',.' + options.toggle);
            for (var i = 0; i < dropdowns.length; i++) {
                addClass(dropdowns[i], options.collapsed);
                var toggle = dropdowns[i].previousElementSibling;
                if (toggle && toggle.tagName == "A") {
                    addClass(toggle, options.toggle);
                    addClass(toggle, options.collapsed);
                }
            }

            addEvent(wrapper, 'click', onClick.bind(this));
            addEvent(wrapper, 'touchstart', onTouchStart.bind(this));
            addEvent(document.body, 'touchend', onTouchEnd.bind(this));
            addEvent(document.body, 'mouseup', onTouchEnd.bind(this));
            addEvent(document.body, 'touchmove', onTouchMove.bind(this));
            addEvent(window, 'resize', onResize.bind(this));
            onResize();

            // Init callback
            options.onInit();
        };

        var updateMode = function() {
            var oldMode = mode;

            mode = window.getComputedStyle(document.body, ':before').content.replace(/"/g, '');

            if (mode !== oldMode) {
                if (mode == 'desktop') {
                    // Remove the dropdown from the nav
                    removeClass(nav, options.dropdown);

                    // Remove max-height from dropdowns
                    updateHeights('');
                } else {
                    // Add the dropdown to the nav
                    addClass(nav, options.dropdown);

                    // Remove fly reverse classes
                    var reversedDropdowns = getElements('.' + options.flyReverse, nav);
                    forEach(reversedDropdowns, function(index, reversedDropdown) {
                        removeClass(reversedDropdown, options.flyReverse);
                    }, this);
                }

                // Close the open dropdowns (not via toggle(), because we don't want the transition)
                var dropdowns = getElements('.' + options.expanded, nav);
                forEach(dropdowns, function(index, dropdown) {
                    addClass(dropdown, options.collapsed);
                    removeClass(dropdown, options.expanded);
                }, this);

                // Mode change callback
                options.onChangeMode();
            }
        };

        var updateHeights = function(height) {
            var dropdowns = getElements('.' + options.dropdown, wrapper);
            for (var i = dropdowns.length - 1; i >= 0; i--) {
                updateHeight(dropdowns[i], height);
            }
        };

        var updateHeight = function(dropdown, height) {
            if (typeof height == 'undefined') height = calcHeight(dropdown) + 'px';
            dropdown.style.maxHeight = height;
        };

        var calcHeight = function(dropdown) {
            var height = 0;
            for (var item = 0; item < dropdown.children.length; item++) {
                height+= dropdown.children[item].offsetHeight;
            }

            return height;
        };

        var updateFlyDirections = function() {
            var dropdowns = getElements('.' + options.dropdown, nav);
            for (var i = 0; i < dropdowns.length; i++) {
                var dropdown = dropdowns[i];

                removeClass(dropdown, options.flyReverse);
                var offset = Math.ceil(dropdown.getBoundingClientRect().left + dropdown.offsetWidth);
                if (offset > window.innerWidth - options.flyReverseMargin) {
                    addClass(dropdown, options.flyReverse);
                }
            }
        };

        var changeState = function(dropdown, state) {
            // Remove the class of the previous state
            removeClass(dropdown, options[state == 'expand' ? 'collapsed' : 'expanded']);

            // If the transitions are enabled use them
            if (options[mode + 'Transition'] > 0) changeStateClasses(dropdown, state + 'ing');

            // Change state to finished after the transition
            setTimeout(changeStateClasses, options[mode + 'Transition'], dropdown, state + 'ed');
        };

        var changeStateClasses = function(dropdown, state) {
            var add,
                remove;

            switch (state) {
                case 'expanding':
                    add = 'expanding';
                    break;

                case 'expanded':
                    remove = 'expanding';
                    add = 'expanded';
                    break;

                case 'collapsing':
                    add = 'collapsing';
                    break;

                case 'collapsed':
                    remove = 'collapsing';
                    add = 'collapsed';
                    break;
            }

            if (remove) removeClass(dropdown, options[remove]);

            // In case of starting the collapsing transition we need to wait for the dropdown to get it's max-height back
            // In other cases we can just set the class
            if (state == 'collapsing') {
                delayed(function() {
                    addClass(dropdown, options[add]);
                }, 2);
            } else {
                addClass(dropdown, options[add]);
            }
        };

        var toggleState = function(element) {
            var nextState,
                parent;

            // Figure out what will be the new state of the element
            if (hasClass(element, options.expanded)) {
                nextState = 'collaps'; // We use 'collaps', so we can append 'ing' or 'ed' later
            } else if (hasClass(element, options.collapsed)) {
                nextState = 'expand';
            }

            if (nextState) {
                // In mobile, if the element is a dropdown, we update the height change to parents
                if (mode == 'mobile' && hasClass(element, options.dropdown)) {
                    var heightChange = (hasClass(element, options.collapsed) ? 1 : -1) * parseInt(element.style.maxHeight);
                    for (parent = element.parentNode; parent !== wrapper; parent = parent.parentNode) {
                        if (hasClass(parent, options.dropdown)) {
                            parent.style.maxHeight = parseInt(parent.style.maxHeight) + heightChange + 'px';
                        }
                    }
                }

                changeState(element, nextState);
            }
        };

        var onClick = function(event) {
            var toggle = event.target;

            if (hasClass(toggle, options.toggle)) {
                event.preventDefault();
            }
        };

        var onTouchStart = function(event) {
            touchStartX = event.touches[0].clientX;
            touchStartY = event.touches[0].clientY;
            touchMoved  = false;
        };

        var onTouchMove = function(event) {
            if (Math.abs(event.touches[0].clientX - touchStartX) > 10 || Math.abs(event.touches[0].clientY - touchStartY) > 10) {
                touchMoved = true;
            }
        };

        var onTouchEnd = function(event) {
            var target = event.target,
                trail = [],
                dropdown;

            if (!touchMoved) {

                // If the target is a toggle
                if (hasClass(target, options.toggle)) {
                    event.preventDefault();

                    dropdown = target.nextElementSibling;

                    if (dropdown && hasClass(dropdown, options.dropdown)) {
                        this.toggle(dropdown);
                    }
                }

                if (mode == 'desktop') {
                    // Keep track of the dropdowns to keep open
                    for (dropdown = target; dropdown !== document.body; dropdown = dropdown.parentNode) {
                        if (hasClass(dropdown, options.dropdown)) {
                            trail.push(dropdown);
                        }
                    }

                    // Go through all the open dropdowns ...
                    var dropdowns = getElements('.' + options.dropdown + '.' + options.expanded, wrapper);
                    for (var i = dropdowns.length - 1; i >= 0; i--) {
                        // ... and close the ones that are not in our trail
                        if (trail.indexOf(dropdowns[i]) == -1) {
                            this.toggle(dropdowns[i]);
                        }
                    }
                }
            }
        };

        var onResize = function(event) {
            updateMode();

            if (mode == 'mobile') {
                updateHeights();
            } else {
                updateFlyDirections();
            }
        };



        // Constructor

        var ResponsiveNav = function(opts) {
            options = {
                container: 'responsive-nav',
                toggle: 'dropdown-toggle',
                dropdown: 'dropdown',
                flyReverse: 'dropdown--inverted',
                flyReverseMargin: 28,
                expanding: 'is-opening',
                expanded: 'is-open',
                collapsing: 'is-closing',
                collapsed: 'is-closed',
                desktopTransition: 125,
                mobileTransition: 250,
                onInit: function() {},
                onChangeMode: function() {}
            };

            for (var i in opts) {
                options[i] = opts[i];
            }

            init.call(this);
        };



        // Public functions

        ResponsiveNav.prototype = {
            toggle: function(dropdown) {
                if (hasClass(dropdown, options.dropdown)) {
                    // Change state of the toggle element
                    var toggle = dropdown.previousElementSibling;
                    if (toggle && hasClass(toggle, options.toggle)) {
                        toggleState(toggle);
                    }

                    toggleState(dropdown);
                }
            }
        };

        return new ResponsiveNav(opts);
    };

    window.navipalikka = responsiveNav;

}(document, window));
