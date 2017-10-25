<?php  defined('BASEPATH') or exit('No direct script access allowed');

class Forbidden
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function render()
    {
        $this->CI->response->fail();
    }
}
