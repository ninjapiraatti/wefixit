<?php

    include('./_head.php');

?>
<div class="main-content main-content--fullwidth section-style-5">
    <div class="main-content__content main-content--fullwidth__content">
    <div class="hero">
      <h1><?php echo $page->title; ?></h1>
      <p><?php echo $page->body; ?></p>
    </div>
  </div>
</div>
<div class="main-content main-content--fullwidth section-style-1">
  <div class="main-content__content main-content--fullwidth__content">
    <div class="companies">

      <?php

          include('./_slider.php');

      ?>

    </div>
  </div>
</div>
<div class="main-content main-content--fullwidth section-style-5">
  <div class="main-content__content main-content--fullwidth__content">
    <h2>Fair info</h2>
    <p>Lorem ipsum.</p>
  </div>
</div>

  <?php

	include('./_foot.php');

?>
