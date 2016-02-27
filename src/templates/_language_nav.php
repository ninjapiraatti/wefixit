<?php

foreach($languages as $language) {
	if(wire('user')->language->id == $language->id) continue; // skip current language
	if(!$page->viewable($language)) continue; // check if page not published for this language
	$url = wire('page')->localUrl($language);
	$title = $language->getUnformatted('title')->getLanguagevalue($language->id);
	$name = $language->get('language_name');
	$location = $config->urls->templates;
	return "<li><a class='nav-link language-link' href='{$url}'>$title</a></li>";
}
?>
