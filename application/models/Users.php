<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Users extends MY_Model {

	protected $table = 'users u';
	protected $select = 'u.*,ug.group_id';
	protected $order = 'u.original_name, u.username';
	protected $like = 'u.original_name';
	protected $join = [
		['users_groups ug','u.id=ug.user_id','inner'],
	];

	function updateRoles($field)
	{
		$this->table = 'users_groups';
		$this->id = 'user_id';
		$this->updateBatch($field);
	}

	function getCredential()
	{
		$this->select = '*';
		$this->where['id'] = $this->session->user_id;
		return $this->getOne();
	}

	function getByEmail($email)
	{
		$this->select = 'u.*, GROUP_CONCAT(g.name SEPARATOR "|") as roles, GROUP_CONCAT(j.name SEPARATOR ";") as jobs';
		$this->join = [
			['users_groups ug','u.id=ug.user_id','inner'],
			['groups g','g.id=ug.group_id','inner'],
			['users_jobs uj','uj.user_id=u.id','left'],
			['jobs j','j.id=uj.job_id','left']
		];
		$this->where['u.email'] = $email;
		return $this->getOne();
	}

	function getByUserId($userID)
	{
		$this->select = 'u.*, GROUP_CONCAT(g.name SEPARATOR "|") as roles, GROUP_CONCAT(j.name SEPARATOR ";") as jobs';
		$this->join = [
			['users_groups ug','u.id=ug.user_id','inner'],
			['groups g','g.id=ug.group_id','inner'],
			['users_jobs uj','uj.user_id=u.id','left'],
			['jobs j','j.id=uj.job_id','left']
		];
		$this->where['u.username'] = $userID;
		return $this->getOne();
	}

	public function getStudentByRoom($parameter)
	{
		$this->select = 'u.id, u.username, u.original_name, s.student_id, concat("") as password , u.gender';
		$this->join = [
			['learners l','l.student_id=u.id','left'],
			['students s','s.id=u.id','left']
		];
		$this->where['l.room_id'] = $parameter['room_id'];
		//$this->where['ug.group_id'] = 4;

		return $this->getAll();
	}

	public function getFreeLeader($parameter)
	{
		$this->select = 'u.id, u.original_name,';
		$this->join = [
			['learners l','l.student_id=u.id','left'],
			['rooms r','r.id=l.room_id','left'],
		];
		$this->where = [];
		$this->where['r.id'] = $parameter['room_id'];
	
		return $this->getAll();
	}

	public function getTeacher($parameter=[])
	{
		$this->select = 'u.id, u.username, u.original_name, t.teacher_id, u.gender';
		$this->join = [
			['users_groups ug','u.id=ug.user_id','inner'],
			['teachers t','t.id=u.id','left'],
		];

		$this->where['ug.group_id'] = 3;

		return $this->getAll();
	}

	public function getParent($parameter)
	{
		$this->select = 'u.id, u.original_name';
		$this->join = [
			['users_jobs uj','uj.user_id=u.id','inner'],
		];
		
		$this->where['uj.job_id'] = 2;

		return $this->getAll();
	}

	public function getFreeParent($parameter = [])
	{
		$this->select = 'u.id, u.original_name';
		$this->join = [
			['users_jobs uj','uj.user_id=u.id','inner'],
			['rooms r','r.teacher_id=u.id','left'],
		];

		$this->where[1] = '(isnull(r.teacher_id) or r.id='.$parameter['room_id'].')'; 
		$this->where['uj.job_id'] = 2;
		$this->order = 'u.original_name';

		return $this->getAll();
	}

	public function getCandidateByRoom($parameter)
	{
		$this->select = 'u.id, u.username, u.original_name, s.student_id, concat("") as password , u.gender';
		$this->join[] = ['learners l','l.student_id=u.id','left'];
		$this->join[] = ['students s','s.id=u.id','left'];
		$this->where['l.room_id'] = $parameter['room_id'];
		$this->where['ug.group_id'] = 6;

		return $this->getAll();
	}

	public function getAlumniByYear($parameter)
	{
		$this->select = 'u.id, u.username, u.original_name, a.alumni_id, concat("") as password , u.gender';
		$this->join[] = ['alumni a','a.id=u.id','inner'];
		$this->where['a.graduate'] = date('Y',strtotime($parameter['year']));
		$this->where['ug.group_id'] = 9;

		return $this->getAll();
	}

	function learner($field)
	{
		$this->db->insert('learners',$field);
	}
}