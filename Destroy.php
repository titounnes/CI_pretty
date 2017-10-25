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

if(count($argv) < 2){
  echo "Argumen kedua harus diisi dengan role pengguna.\n";
  echo "php Destroy.php operator.\n";
  echo "Contoh php Build.php operator grid path to file.\n";
  return false;
}

echo "Sedang memproses....\n";

$par = explode('/', $argv[1]);

$controller = CONTROLLER . ucfirst(strtolower($par[0])) . EXT;

if(file_exists($controller) && !isset($par[1])){
  unlink($controller);
  echo $controller ." telah dihapus.\n";
}

$file ='';

if(isset($par[1])){
  $file = $par[1]. EXT;
  if(!in_array($par[1], $method)){
      echo "Gagal.!\n";
      echo $file." tidak ada.\n";
      return false;
  }
  unset($par[1]);
  if(file_exists(QUERY.implode('/',$par).'/'.$file)){
      unlink(QUERY.implode('/',$par).'/'.$file);
  }
}

$dir = QUERY . $par[0]."/";

function RemoveEmptySubFolders($path)
{
  $empty=true;
  foreach (glob($path.DIRECTORY_SEPARATOR."*") as $file)
  {
     $empty &= is_dir($file) && RemoveEmptySubFolders($file);
  }
  return $empty && rmdir($path);
}

$role = QUERY . strtolower($par[0])."/";
if(file_exists($role)){
  RemoveEmptySubFolders($role);
}
echo "Modul " . $argv[1] . " telah berhasil dihapus.\n";
?>
