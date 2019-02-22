<?php

  if (!count($options['pageStack'])) include('_head.php');

?>

<div class="hero">
  <div class="wrapper">
    <h1 class="hero__tagline"><?=$page->copy?></h1>
    <p class="hero__copy"><?=$page->copy?></p>
  </div>
</div>
<div class="wrapper box services" id="<?=$pages->get(1017)->name?>">
  <div class="grid grid--gutter">
    <div class='w1/2@half fw'>
      <div class="services__box mb2">
        <svg class="icon icon--large icon--service">
          <use xlink:href='<?=$config->urls->templates?>img/icons.svg#icon-service'></use>
        </svg>
        <?=$page->body?>
        <a class="button" href="#contact">Ota yhteyttä!</a>
      </div>
    </div>
    <div class="w1/2@half fw">
      <div class="services__box mb2">
        <svg class="icon icon--large icon--earth">
          <use xlink:href='<?=$config->urls->templates?>img/icons.svg#icon-earth'></use>
        </svg>
        <?=$page->body2?>
        <a class="button" href="#contact">Ota yhteyttä!</a>
      </div>
    </div>
  </div>
  <!--<h2 class="tac mt1" id="palvelut"><?=$pages->get(1017)->title?></h2>
  <div class="tac mb2">
    <?=$pages->get(1017)->body?>
  </div>-->
</div>

<div class="section bg--dark pt1 pb2">
  <h2 class="tac mt1" id="hinnasto"><?=$pages->get(1033)->title?></h2>
  <div class="pricing wrapper">
  	<div class="pricing__nav">
  		<ul class="unstyled">
        <?php foreach ($home->hinnasto as $item) : ?>
          <li><a class="slider-nav" data-slider="pricing-slider" data-slide="<?=$item->id?>" href="#"><?=$item->title?></a></li>
        <?php endforeach;?>
  		</ul>
  	</div>

  	<div class="slider-viewport">
  		<ul id="pricing-slider" class="slider">
        <?php foreach ($home->hinnasto as $item) : ?>
  			<li class="slider__slide">
  				<?php echo $item->body; ?>
  				<a href="<?php echo $pages->get(1022)->url;?>">Lisää</a>
  			</li>
      <?php endforeach;?>

  		</ul>
  	</div>
  </div>
</div>

<!--
<div class="section">
  <div class="wrapper">
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
</div>
-->


<div class="section">
  <div class="wrapper wrapper--supernarrow">
    <h2 class="tac mt1" id="<?php echo $pages->get("template=page-contact")->name?>"><?php echo $pages->get("template=page-contact")->title?></h2>
    <?php echo $pages->get("template=page-contact")->render('page-contact.php');?>
  </div>
</div>
<div class="section pt2 pb2 bg--topborder">
  <div class="wrapper grid grid--gutter">
    <div class="w1 w1/2@m tac tal@m mb2">
      <?php echo $pages->get("template=page-contact")->body?>
      <a href="https://wa.me/358400904040?text=Hei" class="button">Juttele Whatsappissa</a>
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
