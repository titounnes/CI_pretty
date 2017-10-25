<?php defined('BASEPATH') or exit('No direct script access allowed');

class Save
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function render()
    {
        foreach ($this->CI->_config['field'] as $f) {
            $field[$f] = $this->CI->security->xss_clean($this->CI->input->post($f));
        }

        if (isset($this->CI->_config['session'])) {
            foreach ($this->CI->_config['session'] as $s) {
                $field[$s] = $this->CI->_session->{$s};
            }
        }

        //$field['deleted_at'] = 0;

        $save = $this->CI->db->insert($this->CI->_config['table'], $field);

        if (! $save) {
            $this->CI->jwt->view(['status'=>2,'message'=>'gagal'], $this->CI->_session);
            return false;
        }

        $id = $this->CI->db->insert_id();

        if ($id>0 && isset($this->CI->_config['related'])) {
            $rel_field[$this->CI->_config['related']['insert_id']] = $id;
            foreach ($this->CI->_config['related']['field'] as $k=>$v) {
                $rel_field[$k] = $v=='session' ? $this->CI->_session->{$k} : $this->CI->input->post($k);
            }
            $this->CI->db->insert($this->CI->_config['related']['table'], $rel_field);
        }

        $this->CI->response->success(['status'=>'insert']);
    }
}
