<?php defined('BASEPATH') or exit('No direct script access allowed');

class Timer
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function render()
    {
        $output = [];

        $output['start'] = $this->CI->_session->start;
        $output['finish'] = $this->CI->_session->finish;
        $output['remain'] = strtotime($this->CI->_session->finish)-strtotime(date('Y-m-d H:i:s'));

        $field = [
            'user_id' => $this->CI->_session->user_id,
            'test_id' => $this->CI->_session->test_id,
            //'course' => $this->CI->_session->course_id,
            'start' => $this->CI->_session->start,
            'finish' => $this->CI->_session->finish,
            'remain' => $output['remain'],
        ];

        $this->CI->db->replace('users_tests', $field);

        $this->CI->response->success($output);
    }
}
