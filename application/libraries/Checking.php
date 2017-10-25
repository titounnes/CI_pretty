<?php defined('BASEPATH') or exit('No direct script access allowed');

class Checking
{
    public function __construct()
    {
        $this->CI =& get_instance();
        $this->CI->load->helper(['file']);
    }

    public function render($config, $bearer = '')
    {
        $path = PDF.$this->CI->input->post('path').'.pdf';
        if (file_exists($path)) {
            $content = read_file($path);
            $output['ready'] = true;
            $this->CI->jwt->view($output);
            return false;
        }

        $output['ready'] = false;
        $this->CI->jwt->view($output);
    }
}
