<?php

class Replace
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function render()
    {
        foreach ($this->CI->_config['field'] as $k=>$f) {
            if (is_integer($k)) {
                $field[$f] = $this->CI->security->xss_clean($this->CI->input->post($f));
            } else {
                $field[$k] = $this->CI->security->xss_clean($this->CI->input->post($f));
            }
        }

        if (isset($this->CI->_config['session'])) {
            foreach ($this->CI->_config['session'] as $k=>$s) {
                if (is_integer($k)) {
                    $field[$s] = $this->CI->_session->{$s};
                } else {
                    $field[$k] = $this->CI->_session->{$s};
                }
            }
        }

        $this->CI->db->replace($this->CI->_config['table'], $field);

        $this->CI->response->success(['status'=>'success']);
    }
}
