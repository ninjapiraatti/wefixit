<?php

    include('./_head.php');

?>

<div class="main-content">
    <div class="main-content__content hero">
        <h1><?php if(!$page->hide_title){echo $page->get('headline|title'); }?></h1>

    </div>
</div>

  <?php
    $sections = $page->children;

    $sectionsMarkup.= '';
    foreach($sections as $section) {
        if($section->template == 'page-section-images') {
            $sectionsMarkup.= "{$section->render('page-section-images.php')}";
        } else {
            $sectionsMarkup.= "{$section->render('page-section.php')}";
        }
    }
    echo $sectionsMarkup;

  ?>


<?php

	include('./_foot.php');

?>
