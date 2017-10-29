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
