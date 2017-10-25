<?php  defined('BASEPATH') OR exit('No direct script access allowed');

class SendNewPassword {

	function __construct()
	{
		$this->CI =& get_instance();
		$this->CI->load->library('email');
	}

	function render()
	{

		$where = [];
		foreach($this->CI->_config['where'] as $f)
		{
			$where[$f] = $this->CI->input->post($f);
		}

		$field['password'] = password_hash($this->CI->input->post('password'), PASSWORD_BCRYPT, ['cost'=>12]);

		$data = $this->CI->db->select('forgotten_password_time')->from('users')->get()->row();
		if($data)
		{
			if(strtotime(date('Y-m-d H:i:s'))<$data->forgotten_password_time)
			{
				$output['status'] = 'passwordReset';
				$output['field'] = $field;
				$output['where'] = $where;
				$this->CI->db->update('users',$field, $where);
				$this->CI->response->success($output);
				return false;
			}
			$output['status'] = 'tokenExpired';
			$this->CI->response->success($output);
			return false;
		}
		//$output['data'] = $data;
		$output['status'] = 'tokenMismatch';
		$this->CI->response->success($output);
		return false;
	}

}
