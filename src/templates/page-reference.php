<?php

  if (!count($options['pageStack'])) include('_head.php');

?>

<div class="reference">
  <h2><?=$page->title?></h2>
  <?=$page->body?>
</div>

<?php

	if (!count($options['pageStack'])) include('_foot.php');

?>
