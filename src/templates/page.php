<?php

  if (!count($options['pageStack'])) include('_head.php');

?>

<div class="wrapper wysiwyg mt4">
  <h1 class="tagline"><?=$page->title?></h1>
  <div><?=$page->body?></div>
</div>

<?php

	if (!count($options['pageStack'])) include('_foot.php');

?>
