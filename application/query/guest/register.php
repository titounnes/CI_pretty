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
  'username' => 'required|regex_match[/[A-Za-z0-9\.\_\@]/]|min_length[6]|max_length[50]|is_unique[users.username]',
  'password' => 'required|min_length[6]|max_length[20]',
  'name' => 'required|min_length[6]|max_length[50]',
];
$obj->relation = 'users_groups';
$obj->pk = 'user_id';
$obj->fk = 'group_id';
