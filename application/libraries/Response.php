<?php defined('BASEPATH') or exit('No direct script access allowed');

class Response
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function success($data, $session = [])
    {
        if(count($session) == 0){
          $session = $this->CI->_session;
        }
        $this->view($data, $session);
    }

    public function fail()
    {
        $this->view();
    }

    private function view($output = [], $jwt = false)
    {
        if($jwt==false){
            $output['jwt'] = false;
        }else{
            $output['jwt'] = $this->CI->jwt->encode($jwt);
        }
        //$output['test'] = $jwt;
        $this->CI->output
            ->set_header('HTTP/1.1 200 OK')
            ->set_header('Cache-Control: no-store, no-cache, must-revalidate')
            ->set_header('Cache-Control: pos t-check=0, pre-check=0')
            ->set_header('Pragma: no-cache')
            ->set_header('Access-Control-Allow-Origin: *')
            ->set_header("Access-Control-Allow-Headers: Bearer, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method")
            ->set_header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE")
            ->set_content_type('application/json')
            ->set_output(json_encode($output));
    }
}
