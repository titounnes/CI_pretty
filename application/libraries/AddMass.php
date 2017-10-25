<?php defined('BASEPATH') or exit('No direct script access allowed');

class AddMass
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function render()
    {
        $field = [];
        $maxCount = 40;
        $count = $this->CI->db->get_where('learners',['room_id'=>$this->CI->_session->room_id])->num_rows();
        foreach ($this->CI->_config['field'] as $f) {
          if($this->CI->input->post($f) != ''){
            foreach ($this->CI->input->post($f) as $k => $v) {
              if($f=='username'){
                if($this->CI->db->get_where('users',['username'=>$v])->num_rows()>0){
                  $this->CI->response->success(['status' => 'duplicate','username'=>$v]);
                  return false;
                }
              }
              if($f=='password'){
                  $field[$k][$f] = password_hash($v, PASSWORD_DEFAULT, ['cost'=>12]);
              }else if($f=='username'){
                    $field[$k][$f] = $v;
                    $field[$k]['email'] = $v;
              }else if($f=='gender'){
                  $field[$k][$f] = strtoupper(substr($v,0,1))=='L' ?
                     1 : 2;
              }else{
                $field[$k][$f] = strip_tags($v);
              }
            }
          }
        }
        if(count($field)+$count>$maxCount){
            $this->CI->response->success(['status' => 'over','max'=>$maxCount,'over'=>(count($field)+$count-$maxCount)]);
            return false;
        }
        $a= [];
        foreach($field as $value){
            if(isset($value['username'])){
              $insert = $this->CI->db->insert('users',$value);
              if($insert){
                $id = $this->CI->db->insert_id();
                $this->CI->db->insert('users_groups',['user_id'=>$id,'group_id'=>4]);
                $this->CI->db->insert('learners',['user_id'=>$id,'room_id'=>$this->CI->_session->room_id]);
            }
          }
        }
        $this->CI->response->success(['status' => 'addMass','field'=>$a]);
    }
}
