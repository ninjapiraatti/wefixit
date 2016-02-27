<!DOCTYPE html>
<html lang="<?=$user->language->name == 'default' ? 'fi' : $user->language->name?>">
<head>
    <meta charset="utf-8">
    <title><?=$home->title?></title>
    <meta name="description" content="<?=$home->meta_description?>">
    <meta name="keywords" content="<?=$home->meta_keywords?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" media="screen" href="<?=$config->urls->templates?>css/main.css">
    <script src="<?=$config->urls->templates?>js/scripts.js"></script>
    <?php/*
    // handle output of 'hreflang' link tags for multi-language
	// this is good to do for SEO in helping search engines understand
	// what languages your site is presented in
	foreach($languages as $language) {
		// if this page is not viewable in the language, skip it
		if(!$page->viewable($language)) continue;
		// get the http URL for this page in the given language
		$url = $page->localHttpUrl($language);
		// hreflang code for language uses language name from homepage
		$hreflang = $homepage->getLanguageValue($language, 'name');
		// output the <link> tag: note that this assumes your language names are the same as required by hreflang.
		echo "\n\t<link rel='alternate' hreflang='$hreflang' href='$url' />";
	}*/
  ?>
</head>

<body class="page-<?php echo $page->name; ?> template-<?php echo $page->template; ?>">
    <div style="display:none;">
        <svg>
            <symbol id="icon-logo" viewBox="0 0 30 30">
                <circle cx="15" cy="15" r="15"/>
            </symbol>
            <symbol id="icon-nav" viewBox="0 0 16 16">
                <path d="M1 2h14M1 8h14M1 14h14" stroke-width="2" stroke-linecap="round"/>
            </symbol>
        </svg>
    </div>

    <div class="page">
        <header class="main-header">
            <div class="main-header__content">
                <a href="<?=$home->url?>" class="site-title">
                    <img class="site-title__logo" src="<?=$config->urls->templates?>images/logo.png" alt="Contact Forum" />
                </a>

                <nav class="responsive-nav-viewport">
                    <button class="responsive-nav-toggle"><svg class="icon"><use xlink:href="#icon-nav"></use></svg></button>
                    <?php
                        $navigation = $modules->get("MarkupSimpleNavigation");

                        $excludedTemplates = array();
                        array_push($excludedTemplates, 'page-listing-editor', 'page-section', 'page-speaker', 'page-section-images');

                        $navigationOptions = array(
                            'parent_class' => 'nav-item--active',
                            'current_class' => '',
                            'has_children_class' => '',
                            'levels' => false,
                            'max_levels' => 2,
                            'outer_tpl' => '<ul class="nav responsive-nav">||<li><languages/></li></ul>',
                            'inner_tpl' => '<ul class="nav dropdown">||</ul>',
                            'list_tpl' => '<li%s>||</li>',
                            'item_tpl' => '<a href="{url}" class="nav-link">{title}</a>',
                            'item_current_tpl' => '<a href="{url}" class="nav-link nav-link--active">{title}</a>',
                            'selector' => '!template=' . implode('|', $excludedTemplates)
                        );


                        $navbarLanguagesMarkup = include("_language_nav.php");
                        $navigationMarkup = $navigation->render($navigationOptions);
                        $navigationMarkup = str_replace('<languages/>', $navbarLanguagesMarkup, $navigationMarkup);

                        echo $navigationMarkup;
                    ?>

                </nav>
            </div>
        </header>
