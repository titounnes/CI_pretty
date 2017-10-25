<?php 

class Csrf{


	function __construct()
	{
		$this->CI =& get_instance();
		$this->CI->load->helper(['text']);
	}

	function getToken()
	{
		/*if($this->CI->session->userdata('csrfkey'))
		{
			$this->CI->session->unset_userdata('csrfkey');
			$this->CI->session->unset_userdata('csrfvalue');
		}
		*/
		$this->CI->load->helper('string');
		$output['key']   = random_string('alnum', 8);
		$output['value'] = random_string('alnum', 20);
		$this->CI->session->set_flashdata('csrfkey', $output['key']);
		$this->CI->session->set_flashdata('csrfvalue', $output['value']);
		return $output;
	}

	function validToken()
	{
		if($this->CI->session->csrfkey==NULL)
		{
			return false;
		}
		if(($this->CI->input->post($this->CI->session->userdata('csrfkey'))) !=$this->CI->session->csrfvalue)
		{
			return false;
		}
		return true;
	}
}