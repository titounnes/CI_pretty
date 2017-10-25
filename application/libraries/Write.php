<?php  defined('BASEPATH') or exit('No direct script access allowed');

class Write
{
    public function __construct()
    {
        $this->CI =& get_instance();
        $this->CI->load->helper(['file']);
    }

    private function extract($data, $path)
    {
        if (!file_exists(IMAGES)) {
            mkdir(IMAGES, 0777);
        }

        preg_match_all("/\"data:image\/(png|jpg|jpeg|gif);base64,([^`]*?)\"/", $data, $img);

        foreach ($img[0] as $k => $v) {
            $content = str_replace('"', '', preg_replace("/data:image\/(png|jpg|jpeg|gif);base64,/", "", $v));
            write_file(IMAGES . md5($content), base64_decode($content));
            $data = str_replace($v, '/image/read/'. md5($content).'.png ', $data);
        }

        write_file($path, gzcompress($data));
    }

    public function render()
    {
        $path = $this->CI->_config['path'].$this->CI->uri->segments[4].'.dat';

        $dir = explode("/", $path);

        if (in_array('summaries', $dir)) {
            write_file($path, gzcompress($this->CI->input->post('text')));
        } else {
            $this->extract($this->CI->input->post('text'), $path);
        }

        if (in_array('products', $dir) || in_array('summaries', $dir)) {
            $ids = explode('-', $this->CI->uri->segments[4]);
            $field = [
                'name' => $dir[count($dir)-1],
                'id' => $ids[0],
                'id2' => $ids[1],
                'status' => 1,
                'time' => date('Y-m-d H:i:s'),
            ];

            $this->CI->db->replace('queues', $field);

            if (in_array('products', $dir)) {
                $where = [
                    'user_id' => $ids[1],
                    'project_id' => $ids[0],
                    'date_log' => date('YmdH'),
                ];

                $field_atribut = [
                    'user_id' => $ids[1],
                    'project_id' => $ids[0],
                    'date_log' => date('YmdH'),
                    'log' => date('Y-m-d H:i:s'),
                ];

                foreach ($this->CI->input->post('atribut') as $k=>$a) {
                    $field_atribut[$k] = $a;
                }

                if ($this->CI->db->get_where('log_product', $where)->num_rows()==0) {
                    $this->CI->db->insert('log_product', $field_atribut);
                } else {
                    $this->CI->db->update('log_product', $field_atribut, $where);
                }

                $output['log'] = $field_atribut;
            }
        }

        $output['mtime'] = filemtime($path);
        $this->CI->response->success($output);
    }
}
