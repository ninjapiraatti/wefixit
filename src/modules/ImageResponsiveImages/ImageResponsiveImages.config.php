<?php

$config = [

	"budget" => [
		"type" => "integer",
		"label" => __("Performance budget"),
		"value" => 40000,
		"required" => true
	],

	"limit" => [
		"type" => "integer",
		"label" => __("File limit"),
		"value" => 20,
		"min" => 2,
		"required" => true
	]

];
