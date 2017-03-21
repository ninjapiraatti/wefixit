<?php
  function setupFormMarkup(InputfieldForm $form) {
  $form->setMarkup(array(
    'list' => "<ul {attrs}>{out}</ul>",
    'item' => "<li {attrs}>{out}</li>",
    'item_label' => "<label class='{class}' for='{for}'>{out}</label>",
    'item_label_hidden' => "<label class='{class} form-field__label--hidden'><span>{out}</span></label>",
    'item_content' => "<div class='{class}'>{out}</div>",
    'item_error' => "<div class='form-field__error screen-reader-text'>{out}</div>",
    'item_description' => "<div class='form-field__description'>{out}</div>",
    'item_head' => "<h2>{out}</h2>",
    'item_notes' => "<div class='form-field__notes'>{out}</div>",
    'item_icon' => "",
    'item_toggle' => "",
  ));

  $form->setClasses(array(
    'form' => '', // additional clases for InputfieldForm (optional)
    'list' => 'form-fields',
    'list_clearfix' => '',
    'item' => 'form-field',
    'item_label' => 'form-field__label', // additional classes for InputfieldHeader (optional)
    'item_content' => 'form-field__content',  // additional classes for InputfieldContent (optional)
    'item_required' => 'form-field--required', // class is for Inputfield
    'item_error' => 'form-field--error', // note: not the same as markup[item_error], class is for Inputfield
    'item_collapsed' => '',
    'item_column_width' => '',
    'item_column_width_first' => '',
    'item_show_if' => '',
    'item_required_if' => ''
  ));

  $form->addHookAfter('render', null, 'cleanMarkup');

  $form->addHookBefore('Inputfield::render', function($event) {
    // Unset size, as we don't care about it
    $event->object->size = '';

    switch ($event->object) {
      case "InputfieldPage":
        $inputClass = $event->object->getInputfield();
        break;

      case "InputfieldPageTitle":
        $inputClass = "InputfieldText";
        break;

      default:
        $inputClass = $event->object->className();
        break;
    }
    $event->object->addClass(strtolower(str_replace("Inputfield", "form-field--", $inputClass)), "wrapClass");
  });
  }

  // Form hook
  function cleanMarkup($event) {
  $return = $event->return;

  // Remove Fieldtype and Inputfield classes, pw- and ui- classes
  $return = preg_replace('/((?:\s*)?(?:Fieldtype[A-Za-z0-1]*_?|Inputfield[A-Za-z0-1]*_?|pw-[A-Za-z0-1-]*|ui-[A-Za-z0-1-]*))/', '', $return);

  // Remove empty id and class attributes
  $return = preg_replace('/((?:id|class)=["\']\s*["\'])/', '', $return);

  $event->return = $return;
  }
?>
