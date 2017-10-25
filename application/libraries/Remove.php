<?php defined('BASEPATH') or exit('No direct script access allowed');

class Remove
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function render()
    {
        $where = [];
        foreach ($this->CI->_config['session'] as $s) {
            $where[$s] = $this->CI->_session->{$s};
        }

        $where[$this->CI->_config['key']] = $this->CI->uri->segments[4];

        $this->CI->db->delete($this->CI->_config['table'], $where);

        $this->CI->response->success(['status'=>'remove']);
    }
}
