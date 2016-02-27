<?php

    include('./_head.php');

?>

<div class="main-content">
    <div class="main-content__content hero">
        <h1><?php if(!$page->hide_title){echo $page->get('headline|title'); }?></h1>

    </div>
</div>
<div class="main-content main-content--fullwidth section-style-<?php echo $page->section_style->id; ?>">
    <div class="main-content__content main-content--fullwidth__content">
        <?php echo $page->body; ?>
    </div>
</div>

        <?php

        	include('./_foot.php');

        ?>
