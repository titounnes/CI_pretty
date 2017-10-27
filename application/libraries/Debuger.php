<?php defined('BASEPATH') or exit('No direct script access allowed');

class Debuger
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    private function notable(){
      $url = $this->CI->uri->segments;
      unset($url[0]);
      unset($url[1]);
      $file = $url[3];
      unset($url[3]);
      echo "Nama table belum didefinisikan di ". QUERY .implode('/',$url)."/".$file.".php";
    }

    public function render()
    {
        echo '<h2>Query Statement</h2>';
        switch(strtolower($this->CI->uri->segments[3])){
          case 'login' :
            $this->CI->load->library('login');
            if(!isset($this->CI->obj->table) || $this->CI->obj->table == ''){
              $this->notable();
            } else{
              echo $this->CI->login->debug();
            echo '<h2>Query Result</h2>';
            echo json_encode($this->CI->login->test());
          }
          break;
          case 'grid' :
            if(!isset($this->CI->obj->table) || $this->CI->obj->table == ''){
              $this->notable();
            } else{
              echo $this->CI->database->getStatement();
            echo '<h2>Query Result</h2>';
            echo json_encode($this->CI->database->getResult());
            }
          break;
          case 'remove' :
            if(isset($this->CI->obj->table) && $this->CI->obj->table != ''){
              echo "DELETE FROM " . $this->CI->obj->table;
            }else{
              $this->notable();
            }
            if(isset($this->CI->obj->key) && $this->CI->obj->key !=''){
              echo " WHERE ". $this->CI->obj->key . " = \$this->key";
            }
            if(count($this->CI->obj->session > 0)){
              foreach($this->CI->obj->session as $s){
                echo " and " . $s ." = \$this->session->" .$s;
              }
            }
            break;
          case 'append' :
            echo "INSERT INTO " . $this->CI->obj->table . " (";
            if(count($this->CI->obj->field > 0)){
              echo implode(', ', $this->CI->obj->field);
            }
            if(count($this->CI->obj->session > 0)){
              echo ", ". implode(', ', $this->CI->obj->session);
            }
            echo ") VALUES (";
            if(count($this->CI->obj->field > 0)){
              echo "\$this->input->post(". implode("), \$this->input->post(", $this->CI->obj->field).")";
            }
            if(count($this->CI->obj->session > 0)){
              echo "\$this->input->post(". implode("), \$this->input->post(", $this->CI->obj->session).")";
            }
            echo ")";
            break;
        }
    }
}
