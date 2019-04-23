<?php

  if (!count($options['pageStack'])) include('_head.php');

?>

<div class="wrapper mt4 mb4">
  <div class="section campaign">
    <h1 class="tac h1"><?=$page->title?></h2>
    <p class="tac mb2"><?=$page->summary?></p>
    <div class="grid grid--gutter">
      <div class="w1 w1/2@m">
        <div class="wysiwyg campaignbox">
          <?=$page->body?>
        </div>
      </div>
      <div class="w1 w1/2@m">
        <div class="wysiwyg campaignbox">
          <?=$page->body2?>
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div class="w1 tac mt2 mb2">
      <a href="https://wa.me/358400904040?text=Hei" class="button">Varaa aika Whatsappissa<svg class="icon icon--whatsapp">
        <use xlink:href='<?=$config->urls->templates?>img/icons.svg#icon-whatsapp'></use>
      </svg></a>
    </div>
    <div class="wrapper wrapper--supernarrow">
      <h2 class="tac mt1" id="<?php echo $pages->get("template=page-contact")->name?>"><?php echo $pages->get("template=page-contact")->title?></h2>
      <?php echo $pages->get("template=page-contact")->render('page-contact.php');?>
    </div>
  </div>
</div>
<div class="section pt2 pb2 bg--dark">
  <div class="wrapper grid grid--gutter">
    <div class="w1 w1/2@m tac tal@m mb2">
      <?php echo $pages->get("template=page-contact")->body?>
    </div>
    <div class="w1 w1/2@m">
      <div class="map-responsive">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d495.6620356530144!2d25.0329918!3d60.2031057!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjDCsDEyJzExLjIiTiAyNcKwMDInMDAuNyJF!5e0!3m2!1sen!2sfi!4v1519288081024" width="400" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</div>


<?php

	if (!count($options['pageStack'])) include('_foot.php');

?>
