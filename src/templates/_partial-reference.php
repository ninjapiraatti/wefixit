<div class="reference mb2">
  <img src="<?=$page->image->url?>" />
  <button class="play-button" data-sample="sample-<?=$page->id?>"></button>
  <audio id="sample-<?=$page->id?>">
    <source src="<?=$page->file->url?>">
    Audioelementtiä ei voitu toistaa.
  </audio>
  <div class="reference__info">
    <h3 class="tac mb1"><?=$page->title?></h3>
    <?=$page->body?>
  </div>
</div>
