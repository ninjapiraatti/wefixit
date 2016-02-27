
<div class="main-content main-content--fullwidth section-style-<?php echo $page->section_style->id; ?>">
    <div class="main-content__content main-content--fullwidth__content">
        <div class="row <?php if($page->extra_class) { echo $page->extra_class;} ?>">
          <div class="col-base-12 title-column">
            <h2><?php if(!$page->hide_title){echo $page->get('headline|title'); }?></h2>
          </div>
          <?php
            if (!$page->repeater_breakpoints) {
              $breakpoints = "col-sm-";
            } else {
              $breakpoints = $page->repeater_breakpoints;
            }
            $numberColumns = 12 / count($page->repeater_column);
            foreach($page->repeater_column as $repeaterItem) {
              echo "<div class='col-base-12 ";
              echo $breakpoints;
              echo $numberColumns;
              echo "'>";
              echo $repeaterItem->body;
              if(($page->extra_class == "section-contact-form") && (!$formOnPage)){
                  $form = $forms->render('basic-contact-form');
                  echo $form->scripts;
                  echo $form;
                  $formOnPage = true;
              }
              echo "</div>";
            }

          ?>
        </div>
    </div>
</div>
