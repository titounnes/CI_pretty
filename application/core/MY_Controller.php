<?php defined('BASEPATH') or exit('No direct script access allowed');

/*===============================================================
* CodeIgniter CI_Pretty
* @package	CI_BaseConfig
* @author	Harjito
* @license  http://opensource.org/licenses/BSD-3-Clause 3-clause BSD
* @copyright	Copyright (c) 2017 - 2018, eProject Technology. (https://e-project-tech.com/)
===============================================================*/

class MY_Controller extends CI_Controller
{
    public $_session;
    public $_config;
    public $obj;
    public $validPost =true;
    public $post = [];
    public $validate = [];

    public function __construct()
    {
        parent::__construct();

        date_default_timezone_set('Asia/Jakarta');

        $this->load->library(['encryption','jwt','database','response']);

        /*if (empty($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
            $this->load->library(['forbidden'=>'lib']);
            return false;
        }*/
        /*if(! $this->input->is_ajax_request()){
          $this->load->library(['forbidden'=>'lib']);
          return false;
        }*/

        if (isset($this->uri->segments[3])) {
            $qry = QUERY . $this->uri->segments[1] . '/' . str_replace('_', '/', $this->uri->segments[3]) . '/'. $this->uri->segments[2] . '.php';
            if (file_exists($qry)) {
                require_once $qry;
                $this->obj = $obj;
            }
        }else{
          $qry = QUERY . $this->uri->segments[1] . '/' . $this->uri->segments[2] . '.php';
          if (file_exists($qry)) {
              require_once $qry;
              $this->obj = $obj;
          }
        }

        if(isset($this->obj->field)){
          $this->load->library('form_validation');
          foreach ($this->obj->field as $key => $value) {
            $this->form_validation->set_rules($key,$key,$value);
          }
          $this->validate['status'] = $this->form_validation->run();
          $this->validate['message'] = validation_errors();

        }
        if (strtoupper($this->uri->segments[1]) != 'GUEST') {
            if (isset($_SERVER['HTTP_BEARER'])) {
                $this->_session = $this->jwt->decode($_SERVER['HTTP_BEARER']);
            } elseif (isset($_GET['token'])) {
                $this->_session = $this->jwt->decode($_GET['token']);
            } else {
                $this->_session = false;
                if (in_array(strtoupper($this->uri->segments[1]), ['USER','HOME'])) {
                    $this->load->library(['forbidden'=>'lib']);
                    return false;
                }
            }
        }

        if (isset($this->uri->segments[3])) {
            if (isset($this->obj->session)) {
                foreach ($this->obj->session as $s) {
                    if ($this->input->post($s) != '') {
                        $this->_session->{$s} = $this->input->post($s);
                    }
                }
            }
        }

        if (! $this->_session || ! in_array($this->uri->segments[1], array_merge($this->_session->roles, $this->_session->jobs))) {
            if (! in_array(strtoupper($this->uri->segments[1]), ['GUEST','HOME','USER'])) {
                $this->load->library(['forbidden'=>'lib']);
                return false;
            }
        }

        if (isset($this->obj->param)) {
            $this->_session->{$this->obj->param} = $this->uri->segments[4] ?? '';
        }

        $this->load->library([$this->uri->segments[2]=>'lib']);
    }

    public function execute()
    {
      if($this->validate['status'] == false){
        $this->response->success(['validation'=>$this->validate]);
        return false;
      }
      $this->lib->render();
    }

    public function show()
    {
      var_dump($this->obj);
    }
}

class MY_Debug extends CI_Controller
{
    public $_session;
    public $_config;
    public $obj;

    public function __construct()
    {
        parent::__construct();

        $this->load->library(['encryption','jwt','database','response']);

        if (isset($this->uri->segments[4])) {
            $qry = QUERY . $this->uri->segments[2] . '/' . str_replace('_', '/', $this->uri->segments[4]) . '/'. $this->uri->segments[3] . '.php';
        }else{
          $qry = QUERY . $this->uri->segments[2] . '/' . $this->uri->segments[3] . '.php';
        }

        if (file_exists($qry)) {
            require_once $qry;
            $this->obj = $obj;
        }

        if (strtoupper($this->uri->segments[2]) != 'GUEST') {
            if (isset($_SERVER['HTTP_BEARER'])) {
                $this->_session = $this->jwt->decode($_SERVER['HTTP_BEARER']);
            } elseif (isset($_GET['token'])) {
                $this->_session = $this->jwt->decode($_GET['token']);
            } else {
                $this->_session = false;
                if (in_array(strtoupper($this->uri->segments[2]), ['USER','HOME'])) {
                    $this->load->library(['forbidden'=>'lib']);
                    return false;
                }
            }
        }

        if (isset($this->uri->segments[4])) {
            if (isset($this->obj->session)) {
                foreach ($this->obj->session as $s) {
                    if ($this->input->post($s) != '') {
                        $this->_session->{$s} = $this->input->post($s);
                    }
                }
            }
        }

        if (isset($this->obj->param)) {
            $this->_session->{$this->obj->param} = $this->uri->segments[5] ?? '';
        }

        $this->load->library(['debuger'=>'lib']);
    }

    public function execute()
    {
      unset($this->uri->segments[1]);
      echo '<h1>Unit Testing</h1>';
      echo 'url: <a href="http://'.$_SERVER['SERVER_NAME'].'/'.implode('/',$this->uri->segments).'">http://'.$_SERVER['SERVER_NAME'].'/'.implode('/',$this->uri->segments).'</a></h1>';
      $path = $this->uri->segments;
      $file = $path[3];
      unset($path[3]);
      $sql = QUERY . implode('/',$path)."/".$file.EXT;
      if(!file_exists($sql)){
        echo "<h2>Error!</h2>";
        echo "file ".$sql." belum tersedia";
        echo "Gunakan CLI dengan perintah <br>php Build.php ". implode('/',$this->uri->segments);
        return false;
      }

      echo '<h2>Parameter SQL</h2>';
      echo json_encode($this->obj);
      $this->lib->render();
    }
}
