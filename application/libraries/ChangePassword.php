<?php  defined('BASEPATH') or exit('No direct script access allowed');

class ChangePassword
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function render()
    {
        $output = [];
        $user = $this->CI->db->select('password,username')->from('users')->where('id', $this->CI->_session->user_id)->get()->row();

        if (password_verify($this->CI->input->post('old_password'), $user->password)) {
            $field['password'] = password_hash($this->CI->input->post('new_password'), PASSWORD_DEFAULT, ['cost'=>12]);
            $this->CI->db->update('users', $field, ['id'=>$this->CI->_session->user_id]);
            $output['status'] = 'passwordChanged';
        } else {
            $output['status'] = 'unauthorized';
        }
        $this->CI->response->success($output);
    }
}
