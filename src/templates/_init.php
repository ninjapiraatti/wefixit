<?php

date_default_timezone_set($config->timezone);

$home = $pages->get('/');

$bodyClasses[]= $page->template->name;

include_once('_functions.php');

?>
