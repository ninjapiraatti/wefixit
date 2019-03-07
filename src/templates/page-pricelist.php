<?php

  if (!count($options['pageStack'])) include('_head.php');

?>

<div class="wrapper">
  <div class="wysiwyg">
    <h2><?=$page->title?></h2>
    <?php foreach ($page->children() as $item) : ?>
      <div class="">
        <h2 class="h2"><?=$item->title?></h2>
        <?=$item->body?>
      </div>
    <?php endforeach; ?>
  </div>
</div>


<?php

	if (!count($options['pageStack'])) include('_foot.php');

?>
