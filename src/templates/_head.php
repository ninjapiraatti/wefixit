<!DOCTYPE html>
<html lang="fi">
<head>
  <meta charset="utf-8">
  <title><?=$home->get("headline|title")?></title>
  <meta name="description" content="<?=$home->meta_description?>">
  <meta name="keywords" content="<?=$home->meta_keywords?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" media="screen" href="<?=$config->urls->templates?>css/main.css">
  <?php if (isset($head)) foreach ($head as $entry) echo $entry; ?>
</head>

<body class="<?=implode(" ", $bodyClasses)?>">
  <div style="display:none;">
    <svg>
      <symbol id="icon-nav" viewBox="0 0 16 16">
        <path d="M1 2l14 0M1 8l14 0M1 14l14 0" stroke-width="2" stroke-linecap="round" />
      </symbol>
			<symbol id="icon-x" viewBox="0 0 16 16">
        <path d="M2 2l12 12M14 2l-12 12" stroke-width="2" stroke-linecap="round" />
      </symbol>
    </svg>
  </div>

  <header class="main-header">
    <div class="main-header__content wrapper">
      <a href="<?=$home->url?>" class="site-title">
        <img class="site-title__logo" src="<?=$config->urls->templates?>/img/logo02.png" />
      </a>

      <nav class="responsive-nav-viewport">
        <button class="responsive-nav-toggle"><svg class="icon icon--nav"><use xlink:href="#icon-nav"></use></svg></button>

        <?php
          $navigation = $modules->get("MarkupSimpleNavigation");
          echo $navigation->render([
            "parent_class" => "active",
            "current_class" => "active",
            "show_root" => false,
            "has_children_class" => "",
            "levels" => false,
            "max_levels" => 1,
            "outer_tpl" => "<ul class='nav responsive-nav'>||</ul>",
            "inner_tpl" => "<ul class='nav dropdown'>||</ul>",
            "list_tpl" => "<li%s>||</li>",
            "item_tpl" => "<a href='#{name}' class='nav-link'>{title}</a>",
            "item_current_tpl" => "<a href='#{name}' class='nav-link nav-link--active'>{title}</a>"
          ]);
        ?>
      </nav>
    </div>
  </header>

  <div class="main-content">
