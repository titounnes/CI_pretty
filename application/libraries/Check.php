<?php defined('BASEPATH') or exit('No direct script access allowed');

class Check
{
    public function __construct()
    {
        $this->CI =& get_instance();
        $this->CI->load->helper(['file']);
    }

    public function render($config, $bearer='')
    {
        if ($bearer == '') {
            $this->CI->jwt->view([]);
            return false;
        }

        $jwt = $this->CI->jwt->decode($bearer);

        if (! in_array($this->CI->uri->segments[1], $jwt->roles)) {
            $this->CI->jwt->view([], $jwt);
            return false;
        }

        if ($this->CI->uri->segments[3]=='project_assessment') {
            $path = $config['path'] . $jwt->project_id.'-'.$this->CI->uri->segments[4].'.dat';
        } else {
            $path = $config['path'] . $this->CI->uri->segments[4].'.dat';
        }

        $output['mtime'] = file_exists($path) ? filemtime($path) : 0;
        $this->CI->jwt->view($output, $jwt);
    }
}
