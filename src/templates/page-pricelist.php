<?php

  if (!count($options['pageStack'])) include('_head.php');

?>

<div class="wrapper mt4 mb4">
  <div class="wysiwyg">
    <h2><?=$page->title?></h2>
    <div class="grid grid--gutter">
      <?php foreach ($page->children() as $item) : ?>
        <div class="mt2 w1 w1/2@m">
          <h2 class="h2"><?=$item->title?></h2>
          <?=$item->body?>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</div>


<?php

	if (!count($options['pageStack'])) include('_foot.php');

?>
