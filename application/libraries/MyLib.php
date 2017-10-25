<?php defined('BASEPATH') or exit('No direct script access allowed');

class MyLib
{
    public function __construct()
    {
        $this->CI =& get_instance();
        require_once('/var/app/libraries/'.ucwords($this->CI->uri->segments[2]).'.php');
          echo json_encode($this->CI->uri->segments);
    }

    public function render()
    {
      //echo json_encode($this->CI->uri->segments);
    }
}
