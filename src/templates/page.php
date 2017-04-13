<?php

  if (!count($options['pageStack'])) include('_head.php');

?>

<div class="wrapper box">
  <h1 class="tagline"><?=$page->title?></h1>
  <div class="tac"><?=$page->body?></div>
</div>

<?php

	if (!count($options['pageStack'])) include('_foot.php');

?>
