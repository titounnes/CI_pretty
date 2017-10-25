<?php  defined('BASEPATH') or exit('No direct script access allowed');

class Dropdown
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function render()
    {
        if(isset($this->CI->_config['param'])){
          $this->CI->_session->{$this->CI->_config['param']} =  $this->CI->uri->segments[4];
        }
        $this->CI->response->success(['data' => $this->CI->database->getResult()]);
    }
}
