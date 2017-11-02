<?php  defined('BASEPATH') or exit('No direct script access allowed');

class Register
{
    public function __construct()
    {
        $this->CI =& get_instance();
        $this->CI->load->database();
        $this->CI->password = '';
    }

    private function build(){
      if(isset($this->CI->obj->field))
      {
        foreach ($this->CI->obj->field as $k=>$f) {
            $field[$k] = $this->CI->security->xss_clean($this->CI->input->post($k));
            if($k=='password'){
              $field[$k] = password_hash($this->CI->input->post($k),PASSWORD_DEFAULT, ['cost' => 12]);
            }
        }
      }

      $where = $field;
      unset($where['password']);

      if($this->CI->db
        ->get_where($this->CI->obj->table, $where)->num_rows()>0){
          return false;
      }

      $this->CI->db
        ->insert($this->CI->obj->table, $field);

      $join = [
        $this->CI->obj->pk => $this->CI->db->insert_id(),
        $this->CI->obj->fk => 9,
      ];

      $this->CI->db
        ->insert($this->CI->obj->relation, $join);
        return true;
    }

    public function debug()
    {
        return $this->build()
          ->get_compiled_select();
    }

    public function test()
    {
      $this->CI->db->db_debug = FALSE;
      $res = $this->build()->get();
      return $this->CI->db;
    }

    public function render()
    {
        if($this->build())
        {
          $this->CI->response->success(['status'=>'registered']);
          return false;
        }
        $this->CI->response->success(['status'=>'duplicate','debug'=>$this->build()]);
    }
}
