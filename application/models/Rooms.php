<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Rooms extends MY_Model {

	protected $table;
	//peru diubah

	public function leader($id)
	{
		return $this->db
			->select('id')
			->from('rooms')
			->where('student_id',$id)
			->get()
			->row();
	}

	public function OuterClassroomRegular($classroom)
	{
		$sql="select id,id as title from room where id not in ";
		$sql.="(select room from rooms where classroom_id='".$classroom."') ";
		return $this->db->query($sql)->result();
	}

	public function gets()
	{
		$this->select = 'r.id,c.title,r.room';
		$this->join = [
			['classrooms c','c.id=r.classroom_id','inner']
		];
		return $this->getAll();
	}

	public function getByClassroom($parameter)
	{
		$this->select = 'r.id,concat(c.title," - ",r.room,"") as room,r.teacher_id, t.original_name as teacher,r.student_id, s.original_name as student, count(l.student_id) as countStudent, if(count(l.student_id)>0,0,1) as removeable';
		$this->join = [
			['classrooms c','c.id=r.classroom_id','inner'],
			['learners l','l.room_id=r.id','left'],
			['users t','t.id=r.teacher_id','left'],
			['users s','s.id=r.student_id','left']
		];
		$this->where['classroom_id'] = $parameter['classroom_id'];
		$this->group = 'r.id';
		$this->order = 'r.room';
		return $this->getAll();
	}

	public function getFreeByClassroom($parameter)
	{
		$this->table = 'room r';
		$this->select = 'r.id, r.id as room';
		$this->join = [
			['rooms rs',"rs.room=r.id and (rs.classroom_id='".$parameter['classroom_id']."' or isnull(rs.classroom_id))",'left'],
		];
		$this->where['rs.classroom_id'] = null;
		return $this->getAll();
	}

	public function getRegular()
	{
		$this->select = 'r.id,concat(c.title," - ",r.room) as room,r.teacher_id,r.student_id';
		$this->join = [
			['classrooms c','c.id=r.classroom_id','inner']
		];
		
		$this->where['c.category'] = '1';
		$this->order = 'c.code,r.room';
		return $this->getAll();
	}

	public function getCandidate()
	{
		$this->select = 'r.id,concat(c.title," - ",r.room) as room,r.teacher_id,r.student_id';
		$this->join = [
			['classrooms c','c.id=r.classroom_id','inner']
		];
		
		$this->where['c.category'] = '2';
		$this->order = 'c.code,r.room';
		return $this->getAll();
	}
}