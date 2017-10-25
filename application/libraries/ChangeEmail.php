<?php  defined('BASEPATH') or exit('No direct script access allowed');

class ChangeEmail
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function render()
    {
        $output['status'] = 'unauthorized';

        $email = $this->CI->input->post('email');
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->CI->response->success($output);
            return false;
        }
        $output['email'] = $email;

        $user = $this->CI->db->select('id')->from('users')->where('email', $email)->get();
        if ($user->num_rows()>0) {
            $output['status'] = 'duplicateEmail';
            $this->CI->response->success($output);
            return false;
        }

        $user = $this->CI->db->select('password,username')->from('users')->where('id', $this->CI->_session->user_id)->get()->row();

        if (password_verify($this->CI->input->post('password'), $user->password)) {
            $field['email'] = $email;
            $this->CI->db->update('users', $field, ['id'=>$this->CI->_session->user_id]);
            $output['status'] = 'emailChanged';
        } else {
            $output['status'] = 'unauthorized';
        }
        $this->CI->response->success($output);
    }
}
