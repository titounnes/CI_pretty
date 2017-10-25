<?php defined('BASEPATH') or exit('No direct script access allowed');

class Pivot
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function render()
    {
      $this->CI->response->success([
        'body' => $this->CI->database->getResult('body'),
        'columns' => $this->CI->database->getResult('columns'),
        'rows' => $this->CI->database->getResult('rows'),
      ]);
    }
}
