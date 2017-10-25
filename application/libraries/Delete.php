<?php defined('BASEPATH') or exit('No direct script access allowed');

class Delete
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function render()
    {
        $this->CI->db->update(
            $this->CI->_config['table'],
            ['deleted_at' => time()],
            [$this->CI->_config['key']=>$this->CI->uri->segments[4]]
        );

        $this->CI->response->success(['status'=>'delete']);
    }
}
