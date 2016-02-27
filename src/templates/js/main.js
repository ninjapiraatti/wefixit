document.addEventListener('DOMContentLoaded', function() {

    // Utility functions

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

    var getElement = function(selector, element) {
        return getElements(selector, element)[0];
    };

    var forEach = function(array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
            callback.call(scope, i, array[i]);
        }
    };



    // Helper functions

    var showFieldset = function(targetFieldset) {
      if (!targetFieldset) targetFieldset = fieldsets[0];
      activeFieldset = targetFieldset;

      forEach(fieldsets, function(index, fieldset) {
        // fieldset.style.display = fieldset == targetFieldset ? '' : 'none';
        if (fieldset == targetFieldset) {
          var transform = 'translateX(calc(-' + (index * 100) + '% - ' + (index * 20) + 'px))';
          fieldsetContainer.style.transform = transform;
          fieldsetContainer.style.webkitTransform = transform;
          fieldsetContainer.style.mozTransform = transform;

          updateSignupFormHeight();
        }
      });

      updateSummary();

      forEach(getElements('.form-phase__item'), function(index, phase) {
        removeClass(phase, 'form-phase__item--current');
        if (phase.id == 'form-phase-' + targetFieldset.id.split('Inputfield_')[1]) addClass(phase, 'form-phase__item--current');
      });
    };

    var updateSignupFormHeight = function() {
      signupForm.style.height = activeFieldset.offsetHeight + 'px';
    };

    var updateSummary = function() {
      var value,
          label,
          firstBody = true;

      var result = '<table>';

      var fields = [].slice.call(getElements('.Inputfield', signupForm), 0, -3);
      forEach(fields, function(index, field) {
        switch (field.className.split(' ')[3]) {
          case 'InputfieldButton':
          case 'InputfieldSubmit':
            // Do nothing if button
            break;

          case 'InputfieldFieldset':
            result+= firstBody ? '<tbody>' : '</tbody><tbody>';
            label = getElement('label', field).innerText;
            firstBody = false;
            break;

          case 'InputfieldPage':
            label = getElement('label', field).innerText;
            value = getElement('input:checked', field).nextElementSibling.innerText;
            break;

          case 'InputfieldCheckbox':
            var input = getElement('input', field);
            if (input.id == 'Inputfield_laskutustiedot_samat') {
              label = input.checked ? input.nextElementSibling.innerText : null;
            } else {
              label = input.nextElementSibling.innerText;
              value = input.checked ? localization[language].yes : localization[language].no;
            }
            break;

          case 'InputfieldTextarea':
            label = getElement('label', field).innerText;
            value = getElement('textarea', field).value.replace(/\n\r?/g, "<br>");
            break;

          default:
            label = getElement('label', field).innerText;
            value = getElement('input', field).value;
            break;
        }

        if (label && (hasClass(field, 'InputfieldFieldset') || field.style.display !== 'none')) {
          result+= '<tr>';

          if (value) {
            result+= '<td>' + label + '</td>';
            result+= '<td>' + value + '</td>';
          } else {
            result+= '<td colspan="2">' + label + '</td>';
          }
          result+= '</tr>';
        }

        value = null;
        label = null;
      });

      result+= '</tbody></table>';

      summaryContainer.innerHTML = result;
    };



    // Site variables

    var localization = {
      fi: {
        yes: 'Kyllä',
        no:  'Ei'
      },
      en: {
        yes: 'Yes',
        no:  'No'
      }
    };

    var language = document.documentElement.lang;



    // Actual site scripts

    var nav = navipalikka();

    var signupForm = getElement('#FormBuilder_contact-forum');

    if (signupForm) {
      var fieldsetContainer = signupForm.firstChild;
      var fieldsets = getElements('[id^=Inputfield_page]');
      var activeFieldset;

      var summaryContainer = document.createElement('div');
      summaryContainer.id = 'summary-container';
      fieldsets[fieldsets.length - 1].insertBefore(summaryContainer, getElement('.ui-widget-content', fieldsets[fieldsets.length - 1]));

      var firstError = getElement('.InputfieldStateError');
      if (firstError) {
        for (var fieldset = firstError; !hasClass(fieldset, 'InputfieldFieldset'); fieldset = fieldset.parentNode);
        showFieldset(fieldset);
      } else {
        showFieldset();
      }

      // Handle clicks... i.e. pagination
      addEvent(signupForm, 'click', function(event) {
        var target = event.target;
        for (var element = target; element !== event.currentTarget; element = element.parentNode) {
          if (element.tagName == "BUTTON" && element.name.indexOf('goto-page') === 0) {
            event.preventDefault();
            target = getElement('#Inputfield_page' + element.name.split('goto-page')[1], event.currentTarget);
            showFieldset(target);
            break;
          }
        }
      });

      // Handle form submit (don't send when hitting enter if we are not on the last page)
      addEvent(signupForm, 'submit', function(event) {
        if (fieldsets[fieldsets.length - 1].style.display == 'none') {
          event.preventDefault();
          var nextFieldset = getElement('[id^=Inputfield_page]:not([style*="display: none;"])', signupForm).nextElementSibling;
          showFieldset(nextFieldset);
          getElement('input, textarea, select', nextFieldset).focus();
        }
      });

      addEvent(window, 'resize', updateSignupFormHeight);
    }

    // jQuery number counter

    var numberCounters = getElement('.section--numbers');
    if(numberCounters) {
        $('.section--numbers .col-sm-3 h2').each(function () {
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            }, {
                duration: 2000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }

});
