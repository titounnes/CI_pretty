<?php defined('BASEPATH') or exit('No direct script access allowed');

class Answer
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function render()
    {
        $field = [];

        foreach ($this->CI->_config['session'] as $k => $v) {
            $field[$k] = $this->CI->_session->{$v};
        }

        foreach ($this->CI->_config['field'] as $v) {
            $field[$v] = $this->CI->input->post($v);
        }

        $this->CI->db->replace($this->CI->_config['table'], $field);

        $this->CI->response->success(['field'=>$field]);
    }
}
