<?php

  if (!count($options['pageStack'])) include('_head.php');

?>

<div class="hero hero--webgl">
  <div class="hero__copy">
    <h1><?=$page->title?></h1>
    <?=$page->body?>
    <div class="hero-references">
      <h3 class="tac mt2">Kuuntele ääninäytteitä tästä:</h3>
      <?php $samples = $pages->find("template=page-reference, checkbox=1"); ?>
      <?php foreach ($samples as $sample): ?>
        <div class="hero-reference">
          <button class="play-button" data-sample="sample-<?=$sample->id?>"></button>
          <audio id="sample-<?=$sample->id?>">
            <source src="<?=$sample->file->url?>">
            Audioelementtiä ei voitu toistaa.
          </audio>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</div>

<div class="wrapper box" id="<?=$pages->get(1018)->name?>">
  <h2 class="tac mt1"><?=$pages->get(1018)->title?></h2>
  <div class="tac mb2"><?=$pages->get(1018)->body?></div>
  <div class="grid grid--gutter">
    <?php
      $references = $pages->find("template=page-reference");
      foreach ($references as $reference) {
      echo "<div class='w1/2@s w1/5@l'>";
      echo $reference->render('_partial-reference.php');
      echo "</div>";
    }
    ?>
  </div>
</div>

<div class="bg-color">
  <div class="wrapper wrapper--supernarrow box">
    <?php echo $pages->get("template=page-contact")->render('page-contact.php');?>
  </div>
</div>

<?php

	if (!count($options['pageStack'])) include('_foot.php');

?>
