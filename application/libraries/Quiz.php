<?php defined('BASEPATH') or exit('No direct script access allowed');

class Quiz
{
    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function render()
    {
        $this->CI->_session->{$this->CI->_config['param']} = $this->CI->uri->segments[4];

        $result = $this->CI->database->getRow('quiz');

        $output['dataTest'] = $result;
        $data = $this->CI->db->from('users_tests')
            ->where('user_id', $this->CI->_session->user_id)
            ->where('test_id', $this->CI->uri->segments[4])
            ->get()->row();

        if ($this->CI->uri->segments[1]=='student') {
            $output['dataTest']->remain = $data ? $data->remain : (strtotime($result->finish)-strtotime($result->start));

            $intime = strtotime(date('Y-m-d H:i:s')) >= strtotime($result->start)-600 && strtotime(date('Y-m-d H:i:s'))-600 <= strtotime($result->finish);

            $output['dataTest']->countdown = strtotime($result->start)-strtotime(date('Y-m-d H:i:s'));
            $output['dataTest']->intime = $intime;

            if ($intime) {
                $this->CI->_session->start = $result->start < date('Y-m-d H:i:s') ? date('Y-m-d H:i:s') : $result->start ;
            }

            $this->CI->db->replace(
                'users_tests',
            [
                'user_id' => $this->CI->_session->user_id,
                'test_id' => $this->CI->uri->segments[4],
                'start' => $result->start < date('Y-m-d H:i:s') ? date('Y-m-d H:i:s') : $result->start,
                'finish' => $result->finish,
                'remain' => $output['dataTest']->remain,
            ]
            );

            //debug
            /*$intime = true;
            $output['dataTest']->remain = 20;
            $output['dataTest']->start = date('Y-m-d H:i:s');
            $output['dataTest']->finish = date('Y-m-d H:i:s',strtotime('+'.$output['dataTest']->remain.'seconds'));
            $output['dataTest']->countdown = 1;
            $this->CI->_session->start = $output['dataTest']->start;*/
        } else {
            $intime = true;

            $output['dataTest']->remain = strtotime($result->finish)-strtotime($result->start);
            $output['dataTest']->start = date('Y-m-d H:i:s');
            $output['dataTest']->finish = date('Y-m-d H:i:s', strtotime('+'.$output['dataTest']->remain.'seconds'));
            $output['dataTest']->countdown = 1;
            $this->CI->_session->start = $output['dataTest']->start;
        }

        $this->CI->_session->ontest = false;
        if ($intime) {
            $output['quizItem'] = $this->CI->database->getResult('item');

            $this->CI->_session->ontest = true;
            $this->CI->_session->finish = $output['dataTest']->finish;
            $this->CI->_session->remain  = $output['dataTest']->remain;
            $this->CI->_session->test_id  = $this->CI->uri->segments[4];
        }

        $this->CI->response->success($output);
    }
}
