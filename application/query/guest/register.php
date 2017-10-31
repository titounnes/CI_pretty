<?php defined('BASEPATH') OR exit('No direct script access allowed');

/*===============================================================
* CodeIgniter Base Config
* @package	CI_BaseConfig
* @author	Harjito
* @copyright	Copyright (c) 2017 - 2018, eProject Technology. (https://e-project-tech.com/)
===============================================================*/

$obj = new stdClass();
$obj->table = 'users';
$obj->field = [
  'password' => 'password',
  'username' => '[a-zA-Z0-9]{6,20}|',
];
$obj->relation = 'users_groups';
$obj->pk = 'user_id';
$obj->fk = 'group_id';
