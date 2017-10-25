<?php defined('BASEPATH') or exit('No direct script access allowed');

class Read
{
    public function __construct()
    {
        $this->CI =& get_instance();
        $this->CI->load->helper(['file']);
        $this->CI->load->driver('cache');
    }

    public function render()
    {
        if ($this->CI->uri->segments[3]=='project_assessment') {
            $path = $this->CI->_config['path'] . $this->CI->_session->project_id.'-'.$this->CI->uri->segments[4].'.dat';
        } elseif (in_array($this->CI->uri->segments[3], ['project_product','project_summary'])) {
            $path = $this->CI->_config['path'].$this->CI->uri->segments[4].'.dat';
        } else {
            $file = explode('-', $this->CI->uri->segments[4]);
            $path = $this->CI->_config['path'] . $file[0].'.dat';
        }


        $chache = trim(str_replace(DATA, '',$this->CI->_config['path']),'/').'_'.$this->CI->uri->segments[4];
        $time = $this->CI->input->post('mtime');
        $output['path'] = $chache;
        if (! file_exists($path)) {
            $output['mtime'] = -1;
            $output['data'] = '';
        } elseif (filemtime($path) <= $time*1) {
            $output['mtime'] = 0;
            $output['data'] = gzuncompress(read_file($path));
        } else {
            $output['cache'] = 'yes';
            $output['mtime'] = filemtime($path);
            $output['data'] = gzuncompress(read_file($path));
            /*if(! ${$chache} = $this->CI->cache->get($chache))
            {
                ${$chache} = gzuncompress(read_file($path));
                $this->CI->cache->save($chache, ${$chache}, 300);
                $output['cache'] = 'no';
             }
            $output['cache_info'] = $this->CI->cache->get($chache);
            $output['data'] = ${$chache};*/
        }
        $this->CI->response->success($output);
    }
}
