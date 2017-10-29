<?php
define('CONTROLLER', 'application/controllers/');
define('EXT', '.php');
define('QUERY', 'application/query/');

$method = [
  'grid',
  'append',
  'saveOne',
  'remove',
  'dropdown',
  'pivot'
];

if (php_sapi_name() != "cli") {
  echo "Maaf. Proses harus dilakukan lewat CLI<br>";
  echo "Proses hanya bisa dijalankan lewat CLI";
  return false;
}

if(!isset($argv[1])){
  echo "Gagal..\n";
  echo "Argumen pertama harus diisi dengan modul yang akan dipindahkan.\n";
  echo "Format argumen [role]/[method]/path/to/sql [role2]/path/to/sql.\n";
  echo "Contoh: php Build.php operator/grid/user/author operator/writer.\n";
  return false;
}

if(!isset($argv[2])){
  echo "Gagal..\n";
  echo "Argumen harus disi dengan modul tujuan.\n";
  echo "Format argumen [role]/path/to/sql\n";
  echo "Contoh: php Build.php operator/grid/user/author operator/writer.\n";
  return false;
}

$par = explode('/',$argv[1]);
if(count($par)<3){
  echo "Gagal..\n";
  echo "Argumen minimal terdiri dari 3 segment: role, method dan path.\n";
  echo "Format argumen [role]/[method]/path/to/sql\n";
  echo "Contoh: php Build.php operator/grid/user/author operator/writer.\n";
  return false;
}

if(! in_array($par[1], $method)){
  echo "Gagal..\n";
  echo "method [" . $par[1] . "] tidak tersedia.\n";
  echo "method yang diijinkan adalah: " . implode(',', $method) . ".\n";
  return false;
}

$par2 = explode('/',$argv[2]);
if(count($par)<2){
  echo "Gagal..\n";
  echo "Argumen minimal terdiri dari 2 segment: role, path.\n";
  echo "Format argumen [role]/path/to/sql\n";
  echo "Contoh: php Build.php operator/grid/user/author operator/writer.\n";
  return false;
}

echo "Sedang memproses....\n";
exit;
$controller = CONTROLLER . ucfirst(strtolower($ar[0])) . EXT;

if(!file_exists($controller)){
  $fc = fopen($controller, "w");
  $txt = "<?php defined('BASEPATH') OR exit('No direct script access allowed');\n";
  $txt .= "\n";
  $txt .= "class " . ucfirst(strtolower($par[0])) . " extends MY_Controller{\n";
  $txt .= "}\n";
  fwrite($fc, $txt);
  fclose($fc);
  echo $controller." telah dibuat.\n";
}

$role = QUERY . strtolower($par[0]);
if(!file_exists($role)){
  mkdir($role, 0755);
}

$path = $role;

for($i=2;  $i < count($par); $i++){
  $path .=  '/' . strtolower($par[$i]);
  if(!file_exists($path)){
    mkdir($path, 0755);
  }
}

$sql = $path ."/". $par[1] .  EXT;
$fs = fopen($sql, "w");
$txt = "<?php defined('BASEPATH') OR exit('No direct script access allowed');\n";
$txt .= "\n";
$txt .= "/*===============================================================\n";
$txt .= "* CodeIgniter Base Config\n";
$txt .= "* @package	CI_BaseConfig\n";
$txt .= "* @author	Harjito\n";
$txt .= "* @copyright	Copyright (c) 2017 - 2018, eProject Technology. ";
$txt .= "(https://e-project-tech.com/)\n";
$txt .="===============================================================*/\n";
$txt .= "\n";
/*
 *---------------------------------------------------------------
 * APPLICATION ENVIRONMENT
 *---------------------------------------------------------------
 *
 * You can load different configurations depending on your
 * current environment. Setting the environment also influences
 * things like logging and error reporting.
 *
 * This can be set to anything, but default usage is:
 *
 *     development
 *     testing
 *     production
 *
 * NOTE: If you change these, also change the error_reporting() code below
 */

$txt .= "\$obj = new stdClass();\n";
$txt .= "\$obj->table = '';\n";

switch ($par[1]){
  case 'grid' :
    $txt .= "\$obj->select = '';\n";
    $txt .="\$obj->join = [\n";
    $txt .= "\t['','',''],\n";
    $txt .="];\n";
    $txt .= "\$obj->where = [\n";
    $txt .= "\t''=> ''\n";
    $txt .= "];\n";
    $txt .= "\$obj->group = '';\n";
    $txt .= "\$obj->order = '';\n";
    $txt .= "\$obj->exclude = '';\n";
    $txt .= "\$obj->session = [\n";
    $txt .= "\t\n";
    $txt .= "];\n";
    break;
  case 'saveOne' :
    $txt .="\$obj->field = [\n";
    $txt .="\t\n";
    $txt .="];\n";
    $txt .="\$obj->key = 'id';\n";
    break;
  case 'remove' :
    $txt .="\$obj->key = 'id';\n";
    $txt .= "\$obj->session = [\n";
    $txt .= "\t\n";
    $txt .= "];\n";
    break;
  case 'append' :
    $txt .="\$obj->field = [\n";
    $txt .="\t\n";
    $txt .="];\n";
    $txt .= "\$obj->session = [\n";
    $txt .= "\t\n";
    $txt .= "];\n";
    break;

}

fwrite($fs, $txt);
fclose($fs);

echo $sql . "\n";
//print_r($argv);
?>
