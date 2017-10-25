<?php defined('BASEPATH') or exit('No direct script access allowed');

class Sidebar
{
    public function __construct()
    {
        $this->CI =& get_instance();
        //$this->CI->load->librar
    }

    public function render()
    {

      if($this->CI->_session==false)
      {
        $this->CI->response->fail();
        return false;
      }

      $menu = [];

      foreach($this->CI->_session->roles as $r)
      {
        $menu[] = $r;
      }

      foreach($this->CI->_session->jobs as $j)
      {
        $menu[] = $j;
      }

      if($this->CI->_session->leader != null)
      {
        $menu[] = 'leader';
      }

      $this->CI->response->success(['roles' => $menu]);
    }
}
