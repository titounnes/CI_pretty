<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Mentors extends MY_Model {

	protected $table = 'mentors m';
	
	function checkExists($id)
	{
		$this->where['teacher_id'] = $id;
		return $this->getOne();
	}
}