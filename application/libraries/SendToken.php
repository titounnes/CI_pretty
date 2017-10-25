<?php  defined('BASEPATH') or exit('No direct script access allowed');

class SendToken
{
    public function __construct()
    {
        $this->CI =& get_instance();
        $this->CI->load->library(['email']);
    }

    public function render()
    {
        $parameter=array(
        	'phone'=>'6285640776086',
          'message'=>'Mencoba sms.. Harjito'
        );

        $output['pesan'] = $this->sendSMS($parameter);
        $this->CI->response->success($output);
        return 1;

        $where = [];
        foreach ($this->CI->_config['field'] as $k=>$f) {
            $where[$k] = $this->CI->input->post($f);
        }
        $data = $this->CI->db->get_where('users', $where)->row();
        /*if($data->forgotten_password_time < strtotime(date('Y-m-d H:i:s'))){
          $output['status'] = 'nosent';
          $output['expired'] = date('Y-m-d H:i:s',$data->forgotten_password_time);
          $this->CI->response->success($output);
          return false;
        }*/
        $field['forgotten_password_time'] = strtotime('+ 30 minutes');
        $field['forgotten_password_code'] = substr(str_shuffle('0123456789'), 0, 6);
        $output['where'] = $where['email'];

        if ($this->CI->db->get_where('users', $where)->num_rows()>0) {
            $this->CI->db->update('users', $field, $where);

            $send = $this->sendMail($where, $field);
            if ($send) {
                $output['status'] = 'tokenSent';
                $output['expired'] = date('Y-m-d H:i:s',$field['forgotten_password_time']);
                $this->CI->response->success($output);
                return false;
            }
            $output['debug'] = $send;
            $output['status'] = 'tokenUnsent';
            $this->CI->response->success($output);
            return false;
        }
        $output['status'] = 'unauthorized';
        $this->CI->response->success($output);
    }

    private function sendMail($identity, $code)
    {
        $smtp2go = [
            'protocol' => 'smtp',
            'smtp_host' => 'mail.smtp2go.com',
            'smtp_user' => 'harjito@mail.unnes.ac.id',
            'smtp_pass' => 'jjCoxesdnZYt',
            'smtp_port' => 2525,
            'crlf' => "\r\n",
            'newline' => "\r\n"
        ];

        $sendgrid = [
            'protocol' => 'smtp',
            'smtp_host' => 'smtp.sendgrid.net',
            'smtp_user' => 'harjito',
            'smtp_pass' => 'M12@n0@mr',
            'smtp_port' => 465,
            'crlf' => "\r\n",
            'newline' => "\r\n"
        ];

        $this->CI->email->initialize($smtp2go);
        $this->CI->email->from('admin@support.e-project-tech.com', 'Admin eProject');
        $this->CI->email->to($identity['email']);
        $this->CI->email->subject('Email Test');
        $this->CI->email->message('Code Reset Password anda adalah.'."\r\n".$code['forgotten_password_code']."\r\n".'Berlaku hingga:  '. date('Y-m-d H:i:s', $code['forgotten_password_time']));
        $this->CI->email->send(false);
        return $this->CI->email->print_debugger();
    }

    private function sendSMS($parameter){

      $url = 'https://secure.salmamarkets.com/index.php/rest/sms';

      $maxTime = 30;

      $curl = curl_init();

      curl_setopt($curl, CURLOPT_URL, $url);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
      if ($parameter != '' && count($parameter) != 0) {
          curl_setopt($curl, CURLOPT_POST, true);
          curl_setopt($curl, CURLOPT_TIMEOUT, $maxTime);
          curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($parameter, '', '&'));

          curl_setopt($curl, CURLOPT_FOLLOWLOCATION, false);
      }

      curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
      $response = curl_exec($curl);
/*
      if (0 != curl_errno($curl)) {
          $response = new stdclass();
          $response->code = '500';
          $response->message = curl_error($curl);
          $response->maxTime = $maxTime;

      } else {
          $response0 = $response;

          $response = json_decode($response, 1);

      }*/

      curl_close($curl);

      return $response;
    }
}
