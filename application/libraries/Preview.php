<?php defined('BASEPATH') or exit('No direct script access allowed');

class Preview
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function render()
    {
        $this->CI->response->success([
          'body' => $this->CI->database->getResult('body'),
          'header' => $this->CI->database->getRow('header'),
        ]);

    }
}
