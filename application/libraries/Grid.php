<?php defined('BASEPATH') or exit('No direct script access allowed');

class Grid
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function render()
    {
        $this->CI->response->success(['data' => $this->CI->database->getResult()]);
    }
}
