<?
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/basket.bundle.css',
	'js' => 'dist/basket.bundle.js',
	'rel' => [
		'main.polyfill.core',
	],
	'skip_core' => true,
];