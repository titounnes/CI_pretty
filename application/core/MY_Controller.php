<?php defined('BASEPATH') or exit('No direct script access allowed');

/**
 * CI_Pretty
 *
 * An open source application development framework for PHP
 *
 * This content is released under the MIT License (MIT)
 *
 * Copyright (c) 2017 - 2020, eProject Technology
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @package	MY_Controller
 * @author	eProject Technology
 * @copyright	Copyright (c) 2017 - 2020, eProject Technology (https://e-project-tech.com/)
 * @license	http://opensource.org/licenses/MIT	MIT License
 * @since	Version 1.0.0
 * @filesource
 */

class MY_Controller extends CI_Controller
{
    public $_session = false;
    public $_config;
    public $obj;
    public $validPost =true;
    public $post = [];
    public $validate = [];
    public $params;

    public function __construct()
    {
        parent::__construct();

        $this->load->library(['jwt','database','response']);

        if (isset($this->uri->segments[3])) {
            $qry = QUERY . $this->uri->segments[1] . '/' . str_replace('_', '/', $this->uri->segments[3]) . '/'. $this->uri->segments[2] . '.php';
            if (file_exists($qry)) {
                require_once $qry;
                $this->obj = $obj;
            }
        } else {
            $qry = QUERY . $this->uri->segments[1] . '/' . $this->uri->segments[2] . '.php';
            if (file_exists($qry)) {
                require_once $qry;
                $this->obj = $obj;
            }
        }

        if (isset($this->obj->field)) {
            $this->load->library('form_validation');
            foreach ($this->obj->field as $key => $value) {
                $this->form_validation->set_rules($key, $key, $value);
            }
            $this->validate['status'] = $this->form_validation->run();
            $this->validate['message'] = validation_errors();
        }

        if (strtoupper($this->uri->segments[1]) == 'GUEST') {
            $this->_session = false;
        }else{
          if (isset($_SERVER['HTTP_BEARER'])) {
            $this->_session =   $this->jwt->decode($_SERVER['HTTP_BEARER']);
          }else{
            $this->_session = false;
            $this->load->library(['forbidden'=>'lib']);
            return false;
          }
        }

        if (isset($this->uri->segments[3]) && isset($this->obj->params)) {
            foreach ($this->obj->params as $s) {
              if ($this->input->post($s) != '') {
                  $this->params->{$s} = $this->input->post($s);
              }
            }
        }

        if (! $this->_session || ! in_array($this->uri->segments[1], $this->_session->roles)) {
            if (! in_array(strtoupper($this->uri->segments[1]), ['GUEST','HOME'])) {
                $this->load->library(['forbidden'=>'lib']);
                return false;
            }
        }

        if (isset($this->obj->param)) {
            $this->params->{$this->obj->param} = $this->uri->segments[4] ?? '';
        }

        $this->load->library([$this->uri->segments[2]=>'lib']);
    }

    public function execute()
    {
        if (isset($this->obj->field)) {
            if ($this->validate['status'] == false) {
                $this->response->success(['validation'=>$this->validate]);
                return false;
            }
            $this->lib->render();
        } else {
            $this->lib->render();
        }
    }
}
