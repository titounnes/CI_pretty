<?php defined('BASEPATH') or exit('No direct script access allowed');

class Add
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function render()
    {
        $field = [];
        foreach ($this->CI->_config['field'] as $f) {
            $$f = $this->CI->input->post($f);
            if (is_array($$f)) {
                foreach ($$f as $k=>$d) {
                    $field[$k][$f] = $this->CI->security->xss_clean($d);
                    if (isset($this->CI->_config['session'])) {
                        foreach ($this->CI->_config['session'] as $s) {
                            $field[$k][$s] = $this->CI->_session->{$s};
                        }
                    }
                }
            } else {
                foreach ($field as $k=>$d) {
                    $field[$k][$f] = $$f;
                }
            }
        }
        if (count($field)>0) {
            $this->CI->db->insert_batch($this->CI->_config['table'], $field);
            $status = 'add';
        } else {
            $status = '';
        }
        //$status = $field;
        $this->CI->response->success(['status' => $status]);
    }
}
