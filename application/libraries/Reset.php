<?php  defined('BASEPATH') or exit('No direct script access allowed');

class Reset
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function render()
    {
        foreach ($this->CI->_config as $c) {
            $field = [];
            foreach ($c['session'] as $k=>$s) {
                $field[$k] = $this->CI->_session->{$s} ?? ($this->CI->uri->segments[4] ?? '');
            }
            $this->CI->db->delete($c['table'], $field);
        }

        $this->CI->response->success(['status'=>'reset']);
    }
}
