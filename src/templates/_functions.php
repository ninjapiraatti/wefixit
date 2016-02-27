<?php

function sanitizedValue($field) {
    switch ($field) {
        case 'InputfieldPageTitle':
        case 'InputfieldText':
            $value = wire('sanitizer')->text($field->value);
            break;

        case 'InputfieldTextarea':
            $value = wire('sanitizer')->textarea($field->value);
            break;

        case 'InputfieldPage':
            $value = (string) $field->value;
            break;

        default:
            $value = $field->value;
            break;
    }

    return $value;
}

function paginationSettings() {
    return array(
        'nextItemLabel'        => _x('Next', 'Pagination'),
        'previousItemLabel'    => _x('Previous', 'Pagination'),
        'listMarkup'           => "<ul class='pager'>{out}</ul>",
        'itemMarkup'           => "<li class='pager__page {class}'>{out}</li>",
        'linkMarkup'           => "<a href='{url}'>{out}</a>",
        'currentLinkMarkup'    => "<a href='{url}'>{out}</a>",
        'firstItemClass'       => '',
        'firstNumberItemClass' => '',
        'lastItemClass'        => '',
        'lastNumberItemClass'  => '',
        'separatorItemClass'   => '',
        'nextItemClass'        => 'pager__page--next',
        'previousItemClass'    => 'pager__page--prev',
        'currentItemClass'     => "pager__page--highlight"
    );
}

function setupFormMarkup(InputfieldForm $form) {
    $form->setMarkup(array(
        'list' => "<ul {attrs}>{out}</ul>",
        'item' => "<li {attrs}>{out}</li>",
        'item_label' => "<label class='{class}' for='{for}'>{out}</label>",
        'item_label_hidden' => "<label class='{class} form-field__label--hidden'><span>{out}</span></label>",
        'item_content' => "<div class='{class}'>{out}</div>",
        'item_error' => "<div class='form-field__error-message'>{out}</div>",
        'item_description' => "<div class='form-field__description'>{out}</div>",
        'item_head' => "<h2>{out}</h2>",
        'item_notes' => "<p class='notes'>{out}</p>",
        'item_icon' => "",
        'item_toggle' => "",
    ));

    $form->setClasses(array(
        'form' => '', // additional clases for InputfieldForm (optional)
        'list' => 'unstyled',
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

    // Custom image uploader markup
    wire()->addHookAfter('InputfieldFile::renderUpload', 'ImageUploaderRenderUploader');
    wire()->addHookAfter('InputfieldFile::renderItem', 'ImageUploaderRenderItem');
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

// Form hook
function ImageUploaderRenderUploader($event) {
    $field = $event->object;

    $attr = array(
        "id='{$field->name}'",
        "type='file'"
    );

    if ($field->maxFiles !== 1) {
        array_push($attr,
            "name='{$field->name}[]'",
            'multiple="multiple"'
        );
    } else {
        array_push($attr, "name='{$field->name}'");
    }

    $attr = implode(' ', $attr);

    $out = "<input $attr>";
    $out.= "<div class='form-field__description'>" . htmlspecialchars(str_replace(' ', ', ', trim($field->extensions))) . "</div>";

    $event->return = $out;
};

// Form hook
function ImageUploaderRenderItem($event) {
    $event->replace = true;

    $input = $event->object;
    $pagefile = $event->arguments[0];
    $id = $event->arguments[1];

    $out = '';

    $delete = __('Delete');
    $out.= "<label class='label-delete-image' for='delete_$id'>$delete</label><input type='checkbox' name='delete_$id' id='delete_$id' value='1' title='$delete'>";

    $out.= "<a href='{$pagefile->url}'>{$pagefile->basename}</a>";

    $event->return = $out;
};



// A lazy cron function
function removeAbandonedListings(HookEvent $event) {
    $timeFilter = time() - 21600; // 6 hours ago
    $abandoned = wire()->pages->find("parent.template=page-listings, status=hidden, modified<$timeFilter");
    foreach ($abandoned as $p) {
        wire()->pages->delete($p);
    }
}

// Remove abandoned listings every 6 hours
wire()->addHook('LazyCron::every6Hours', null, 'removeAbandonedListings');

?>
