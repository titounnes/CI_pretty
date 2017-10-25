# CI_pretty

Web service builder

🚧 Masih Dalam Tahap pengembangan

## Petunjuk Instalasi
- Buka terminal atau command prompt pada folder www / htdocs
- Jalan command `git clone https://github.com/titounnes/CI_pretty.git`
- Seting database pada file `application/database.php`

# Fitur

CI_Pretty memiliki beberapa fitur diantaranya :

### Module Generator

Anda dapat membuat sebuah modul dengan menjalankan command `php Build.php [role_user]/[method]/[path/to/config/sql] [table_name]/[table_alias]` pada folder project anda

#### Contoh penggunaan

```
$ php Build.php operator/grid/user/student users/u
```

Setelah perintah dijalankan, jika berhasil akan muncul 

```
Sedang memproses....
application/controllers/Operator.php telah dibuat.
Proses build modul operator/grid/user/studentBerhasil dibuat.
Untuk mengakses: http://example.com/operator/grid/user/student.
Untuk pengujian: http://example.com/debug/operator/grid/user/student.
```

Dari hasil generate maka akan terbentuk sebuah file sebagai berikut :
- application/controllers/Operator.php (jika belum ada)
- application/query/user/student/grid.php

Pada file `application/query/user/student/grid.php` akan terbuat sebuah template untuk kebutuhan Query

```php
<?php defined('BASEPATH') OR exit('No direct script access allowed');

/*===============================================================
* CodeIgniter Base Config
* @package	CI_BaseConfig
* @author	Harjito
* @copyright	Copyright (c) 2017 - 2018, eProject Technology. (https://e-project-tech.com/)
===============================================================*/

$obj = new stdClass();
$obj->table = 'users u';
$obj->select = 'u.*';
$obj->join = [
//	['','',''],
];
$obj->where = [
//	''=> ''
];
$obj->group = '';
$obj->order = '';
$obj->exclude = '';
$obj->session = [
	
];
```

*Method yang tersedia untuk saat ini : grid, saveOne, remove, append

### Hapus Modul

Untuk menghapus sebuah modul anda dapat menjalankan command sebagai berikut :

`$ php Destroy.php [role_user]/[method]/[path/to/config/sql]`

#### Contoh penggunaan

`$ php Destroy.php operator/grid/user/student`

Maka command tersebut akan menghapus file `application/query/operator/user/student.grid.php`

`$ php Destroy.php operator`

Maka command tersebut akan menghapus file `file application/controllers/Operator.php` pada folder `application/query/operator/`

### Debug 

Akses dengan browser ke url http://domain.local/debug/operator/grid/user/student

### Pengujian

Akses dengan browser ke url http://domain.local/api.html
