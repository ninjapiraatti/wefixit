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
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <title>display</title>
        <path d="M27 4.996l-22 0.004c-0.553 0-1 0.443-1 0.996v14c0 0.553 0.447 1 1 1h22c0.553 0 1-0.447 1-1v-14c0-0.553-0.447-1-1-1zM27 20h-22v-14.004h22v14.004zM29 1h-26c-1.657 0-3 1.342-3 3v20c0 1.654 1.338 2.994 2.99 2.998h10.010v1.217l-6.242 0.811c-0.446 0.111-0.758 0.511-0.758 0.97 0 0.553 0.447 1 1 1h18c0.553 0 1-0.447 1-1 0-0.459-0.312-0.859-0.758-0.971l-6.242-0.81v-1.217h10.010c1.652-0.004 2.99-1.344 2.99-2.998v-20c0-1.658-1.344-3-3-3zM30 24c0 0.551-0.449 1-1 1h-26c-0.552 0-1-0.449-1-1v-20c0-0.552 0.448-1 1-1h26c0.551 0 1 0.448 1 1v20z"></path>
        </svg>
        <?=$page->body?>
        <a class="button" href="#contact">Ota yhteyttä!</a>
      </div>
    </div>
    <div class="w1/2@half fw">
      <div class="services__box mb2">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <title>phone</title>
        <path d="M24 0h-16c-1.658 0-3 1.343-3 3v26c0 1.658 1.343 3 3 3h16c1.656 0 3-1.344 3-3v-26c0-1.658-1.344-3-3-3zM25 29c0 0.551-0.449 1-1 1h-16c-0.552 0-1-0.447-1-1v-2.004h18v2.004zM25 25.996h-18v-19.996h18v19.996zM25 5h-18v-2c0-0.552 0.448-1 1-1h16c0.551 0 1 0.448 1 1v2zM18 3.5c0 0.276-0.225 0.5-0.5 0.5h-3c-0.277 0-0.5-0.224-0.5-0.5v0c0-0.277 0.223-0.5 0.5-0.5h3c0.275 0 0.5 0.223 0.5 0.5v0zM17 28.496c0 0.275-0.225 0.5-0.5 0.5h-1c-0.276 0-0.5-0.225-0.5-0.5v0c0-0.277 0.224-0.5 0.5-0.5h1c0.275 0 0.5 0.223 0.5 0.5v0z"></path>
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
  			<li><a class="slider-nav" data-slider="pricing-slider" data-slide="0" href="#">MacBook</a></li>
  			<li><a class="slider-nav" data-slider="pricing-slider" data-slide="1" href="#">iPhone</a></li>
  			<li><a class="slider-nav" data-slider="pricing-slider" data-slide="2" href="#">Android</a></li>
  			<li><a class="slider-nav" data-slider="pricing-slider" data-slide="3" href="#">PC</a></li>
  		</ul>
  	</div>

  	<div class="slider-viewport">
  		<ul id="pricing-slider" class="slider">
  			<li class="slider__slide">
  				<ul class="unstyled">
  					<li>Lorem</li>
            <li>Ipsum</li>
            <li>Dolor</li>
  				</ul>
  				<a href="<?php echo $pages->get(1022)->url;?>">Lisää</a>
  			</li>

        <li class="slider__slide">
  				<ul class="unstyled">
  					<li>Lorem</li>
            <li>Ipsum</li>
            <li>Dolor</li>
  				</ul>
  				<a href="<?php echo $pages->get(1022)->url;?>">Lisää</a>
  			</li>

        <li class="slider__slide">
  				<ul class="unstyled">
  					<li>Lorem</li>
            <li>Ipsum</li>
            <li>Dolor</li>
  				</ul>
  				<a href="<?php echo $pages->get(1022)->url;?>">Lisää</a>
  			</li>

        <li class="slider__slide">
  				<ul class="unstyled">
  					<li>Lorem</li>
            <li>Ipsum</li>
            <li>Dolor</li>
  				</ul>
  				<a href="<?php echo $pages->get(1022)->url;?>">Lisää</a>
  			</li>
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
<div class="section">
  <div class="wrapper grid grid--gutter">
    <div class="w1/2">
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d495.6620356530144!2d25.0329918!3d60.2031057!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjDCsDEyJzExLjIiTiAyNcKwMDInMDAuNyJF!5e0!3m2!1sen!2sfi!4v1519288081024" width="400" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>
    </div>
    <div class="w1/2">
      <?php echo $pages->get("template=page-contact")->body?>
    </div>
  </div>
</div>

<?php

	if (!count($options['pageStack'])) include('_foot.php');

?>
