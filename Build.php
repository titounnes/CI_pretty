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
  echo "Argumen harus disi harus diisi.\n";
  echo "Format argumen [role]/[method]/path/to/sql [namatable/alias]\n";
  echo "Contoh: php Build.php operator/grid/user/author users/u\n";
  return false;
}

$par = explode('/',$argv[1]);
if(count($par)<3){
  echo "Gagal..\n";
  echo "Argumen minimal terdiri dari 3 segment: role, method dan path.\n";
  echo "Format argumen [role]/[method]/path/to/sql [namatable/alias]\n";
  echo "Contoh: php Build.php operator/grid/user/author users/u\n";
  return false;
}

if(! in_array($par[1], $method)){
  echo "Gagal..\n";
  echo "method [" . $par[1] . "] tidak tersedia.\n";
  echo "method yang diijinkan adalah: " . implode(',', $method) . ".\n";
  return false;
}

echo "Sedang memproses....\n";

$controller = CONTROLLER . ucfirst(strtolower($par[0])) . EXT;

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

$tableName = '';
$tableAs = '';
if(isset($argv[2])){
  $tbl = explode('/', $argv[2]);
  $tableName = $tbl[0];
  $tableAs = $tbl[1] ?? '';
}
$txt .= "\$obj = new stdClass();\n";
$txt .= "\$obj->table = '".$tableName." ".$tableAs."';\n";

switch ($par[1]){
  case 'grid' :
    $txt .= "\$obj->select = '".($tableAs == '' ? $tableName : $tableAs ).".*';\n";
    $txt .="\$obj->join = [\n";
    $txt .= "//\t['','',''],\n";
    $txt .="];\n";
    $txt .= "\$obj->where = [\n";
    $txt .= "//\t''=> ''\n";
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
  case 'pivot' :
/*  'columns' => [
      'table' => 'quizs q',
      'select' => 'q.id, c.competence, q.indicator, q.answer',
      'join' => [
          ['quizs_items qi','qi.item_id=q.id','inner'],
          ['competences c','c.id=q.competence_id','inner'],
      ],
      'where' => [
          'qi.quiz_id' => '[quiz_id]',
          'q.deleted_at' => 0,
      ],
      'order' => 'q.id',
  ],
  'rows' => [
      'table' => 'users u',
      'select' => 'u.id, u.username, u.original_name',
      'join' => [
          ['learners l','l.user_id=u.id','inner'],
      ],
      'where' => [
          'l.room_id' => '[room_id]',
      ],
  ],
  'body' => [
      'table' => 'cognitive_scores cs',
      'select' => 'cs.student_id, cs.instrument_id, cs.answer, cs.status',
      'join' => [
          ['learners l','l.user_id=cs.student_id','inner'],
          ['quizs q','q.id=cs.instrument_id','inner'],
          ['quizs_items qi','qi.item_id=q.id and cs.quiz_id=qi.quiz_id','inner'],
      ],
      'where' => [
          'cs.quiz_id' => '[quiz_id]',
          'l.room_id' => '[room_id]',
          'q.deleted_at' => 0,
      ],
  ],
  'session' => [
      'quiz_id',
      'room_id',
  ],
*/
   break;
}

fwrite($fs, $txt);
fclose($fs);

echo "Proses build modul ", $argv[1]. "Berhasil dibuat.\n";
echo "Untuk mengakses: http://example.com/".$argv[1].".\n";
echo "Untuk pengujian: http://example.com/debug/".$argv[1].".\n";
?>
