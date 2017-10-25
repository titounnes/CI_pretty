<?php defined('BASEPATH') or exit('No direct script access allowed');

class Assessment
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function render()
    {
        $id = explode('-', $this->CI->uri->segments[4]);
        if (count($id)==2) {
            $this->CI->_session->project_id = $id[0];
            $this->CI->_session->performance_id = $id[0];
            $this->CI->_session->student_id = $id[1];
        } else {
            $this->CI->_session->student_id = $this->CI->uri->segments[4];
        }

        $this->CI->response->success(['items' => $this->CI->database->getResult()]);
    }
}
