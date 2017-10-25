<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Test extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->library(['analizer']);
		$this->load->database();
	}
	
	function restart()
	{
		$this->db->update('queues', ['status']=>1);
		echo json_encode($analize->checkQueue());
	}
	
	function calculate()
	{		
		$analize = new Analizer;
		echo json_encode($analize->checkQueue());
		
	}
}