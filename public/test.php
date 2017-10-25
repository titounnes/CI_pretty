<?php
//$files = '/mnt/nfs/home/e-project-files/';
//echo $files;
//echo file_exists($files); 
$config = [
	'semester' => 1,
	'year' => 2017,
];

$json = json_encode($config);
$f =fopen('/var/app/data/config/setting.dat', 'w');
fwrite($f, $json);
fclose($f);
echo $json;