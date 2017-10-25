# CI_pretty
Web service builder

Masih Dalam Tahap pengembangan

## Petunjuk Instalasi
git clone https://github.com/titounnes/CI_pretty.git
Seting database di application/database.php

# Fitur

## Generate modul dengan perintah 

php Build.php [role_user]/[method]/[path/to/config/sql] [table_name]/[table_alias]

Contoh Build.php operator/grid/user/student users/u

Setelah perintah dijalankan, jika berhasil akan muncul 

Sedang memproses....
application/controllers/Operator.php telah dibuat.
Proses build modul operator/grid/user/studentBerhasil dibuat.
Untuk mengakses: http://example.com/operator/grid/user/student.
Untuk pengujian: http://example.com/debug/operator/grid/user/student.

Dari hasil generate maka akan dibuat
application/controllers/Operator.php (jika belum ada)
application/query/user/student.grid.php
Pada file application/query/user/student.grid.php akan dibuatkan template objek untuk keperluan query 

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
method yang tersedia untuk saat ini : grid, saveOne, remove, append,  

## Hapus Modul

Perintah
php Destroy.php [role_user]/[method]/[path/to/config/sql]
Contoh
php Destroy.php operator/grid/user/student
Menghapus
File aplication/query/operator/user/student.grid.php

php Destroy.php operator
Menghapus 
file application/controllers/Operator.php
directory aaplication/query/operator/

## Debug 

Akses dengan browser ke url http://domain.local/debug/operator/grid/user/student

## Pengujian

Akses dengan browser ke url http://domain.local/api.html

