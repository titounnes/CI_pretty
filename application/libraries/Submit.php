<?php defined('BASEPATH') or exit('No direct script access allowed');

class Submit
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function render()
    {
        $field = [];
        foreach ($this->CI->_config['field'] as $k=>$f) {
            if ($this->CI->input->post($f) != null) {
                foreach ($this->CI->input->post($f) as $l=>$p) {
                    if($f=='password'){
                      if($p!=''){
                        $field[$l][$f] = password_hash($p, PASSWORD_DEFAULT, ['cost'=>12]);
                      }
                    }else{
                      $field[$l][$f] = $this->CI->security->xss_clean($p);
                    }
                    $field[$l][$this->CI->_config['key']] =  $l;
                    $output['field'] = $field;
                }
            }
        }

        if(isset($field) && isset($this->CI->_config['session'])){
          foreach ($field as $k => $v) {
            foreach($this->CI->_config['session'] as $w){
              $field[$k][$w] = $this->CI->_session->{$w};
              //$where[$w] = $this->CI->_session->{$w};
            }
          }
        }

        if (isset($this->CI->_config['summary'])) {
            foreach ($this->CI->_config['session'] as $s) {
                $where[$s] = $this->CI->_session->{$s};
                if (isset($field)) {
                    foreach ($field as $k=>$f) {
                        $field[$k][$s] = $where[$s];
                    }
                }
            }

            if (isset($field)) {
              foreach ($field as $k=>$f) {
                    $where[$this->CI->_config['key']] = $k;
                    $a = $this->CI->db->get_where($this->CI->_config['table'], $where)->num_rows();
                    if ($a>0) {
                        $this->CI->db->update($this->CI->_config['table'], $f, $where);
                    } else {
                        $this->CI->db->insert($this->CI->_config['table'], $f);
                    }

                    $statement = $this->CI->_config['summary'];
                    preg_match_all("/\[([^`]*?)\]/", $statement, $match);
                    foreach ($match[0] as $value) {
                        $key = trim($value, '[]');
                        if (isset($this->CI->_session->{$key})) {
                            $replacement = $this->CI->_session->{$key};
                            $statement = str_replace($value, $replacement, $statement);
                        }
                    }
                    preg_match_all("/\{([^`]*?)\}/", $statement, $match);
                    foreach ($match[0] as $value) {
                        $key = trim($value, '{}');
                        $statement = str_replace($value, $k, $statement);
                    }
                    $this->CI->db->query($statement);
                }
            }
        } elseif(isset($this->CI->_config['replace'])){
          if(isset($field)){
            foreach ($field as $key => $value) {
              $this->CI->db->replace($this->CI->_config['table'],$value);
            }
            //$this->CI->db->where(['teacher_id'=>0])->delete($this->CI->_config['table']);
          }
        } elseif (isset($field)) {
            $this->CI->db->update_batch($this->CI->_config['table'], $field, $this->CI->_config['key']);
            if (isset($this->CI->_config['triger'])) {
                if (isset($this->CI->_config['triger']['session'])) {
                    foreach ($this->CI->_config['triger']['session'] as $s) {
                        $where_triger[$s] = $this->CI->_session->{$s};
                    }
                }

                foreach ($field as $l=>$p) {
                    $where_triger[$this->CI->_config['triger']['key']] = $l;
                }

                $field_triger= [];
                foreach ($this->CI->_config['triger']['field'] as $f) {
                    if ($this->CI->input->post($f) != null) {
                        foreach ($this->CI->input->post($f) as $l=>$p) {
                            $field_triger[$l][$f] = $this->CI->security->xss_clean($p);
                        }
                    }
                }
                foreach ($field_triger as $f) {
                    $this->CI->db->update($this->CI->_config['triger']['table'], $f, $where_triger);
                }
            }
        }
        $this->CI->response->success(['status' => 'update','field'=>$field]);
    }
}
