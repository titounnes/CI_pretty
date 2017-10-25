<?php defined('BASEPATH') or exit('No direct script access allowed');

class Database
{
    protected $query;
    protected $data;

    public function __construct()
    {
        $this->CI =& get_instance();
        $this->CI->load->database();
    }

    private function getQuery($param='')
    {
        $jwt = $this->CI->_session;

        if ($param == '') {
            $this->query = $this->CI->obj;
        } else {
            $this->query = $this->CI->obj->param;
        }

        if (isset($this->query->select) && $this->query->select != '') {
            $select = $this->query->select;
        }

        if (isset($this->query->table)) {
            $this->CI->db->from($this->query->table);
        }

        if (isset($this->query->join) and count($this->query->join) > 0) {
            foreach ($this->query->join as $j) {
                preg_match_all("/\[([^`]*?)\]/", $j[0], $match);
                foreach ($match[0] as $value) {
                    $key = trim($value, '[]');
                    if (isset($jwt->{$key})) {
                        $replacement = $jwt->{$key};
                        $j[0] = str_replace($value, $replacement, $j[0]);
                    }
                }

                preg_match_all("/\[([^`]*?)\]/", $j[1], $match);
                foreach ($match[0] as $value) {
                    $key = trim($value, '[]');
                    if (isset($jwt->{$key})) {
                        $replacement = $jwt->{$key};
                        $j[1] = str_replace($value, $replacement, $j[1]);
                    }
                }
                $this->CI->db->join($j[0], $j[1], $j[2] ?? 'left');
            }
        }

        if (isset($this->query->exclude) && $this->query->exclude != '') {
            preg_match_all("/\[([^`]*?)\]/", $this->query->exclude, $match);
            foreach ($match[0] as $value) {
                $key = trim($value, '[]');
                if (isset($jwt->{$key})) {
                    $replacement = $jwt->{$key};
                    $this->query->exclude = str_replace($value, $replacement, $this->query->exclude);
                }
            }

            $this->CI->db->where($this->query->exclude);
        }

        if (isset($this->query->where) && count($this->query->where) > 0) {
            $where = [];
            foreach ($this->query->where as $k=>$w) {
                preg_match_all("/\[([^`]*?)\]/", $w, $match);
                foreach ($match[0] as $value) {
                    $key = trim($value, '[]');
                    if (isset($jwt->{$key})) {
                        $replacement = $jwt->{$key};
                        $w = str_replace($value, $replacement, $w);
                    }
                }
                $where[$k] = $w;
            }
            $this->CI->db->where($where);
        }

        if (isset($this->query->select) && $this->query->select != '' ) {
            $this->CI->db->select($select);
        }

        if (isset($this->query->order) && $this->query->order != '') {
            $this->CI->db->order_by($this->query->order);
        }

        $offset = 0;
        $limit= 10;
        if (isset($this->query->offset) && $this->query->offset*1 >0) {
            $offset = $this->query->offset;
        }

        if (isset($this->query->limit) && $this->query->limit*1 > 0) {
            $limit = $this->query->limit;
        }

        $this->CI->db->limit($limit, $offset);

        return str_replace('SELECT', 'SELECT DISTINCT ',$this->CI->db->get_compiled_select());
    }

    public function getResult($param = '')
    {
        if (isset($this->query->union)) {
            $jwt = $this->CI->_session;

            preg_match_all("/\[([^`]*?)\]/", $this->query->union, $match);
            foreach ($match[0] as $value) {
                $key = trim($value, '[]');
                if (isset($jwt->{$key})) {
                    $replacement = $jwt->{$key};
                    $this->query->union = str_replace($value, $replacement, $this->query->union);
                }
            }

            return $this->CI->db->query($this->query->union)->result();
        }

        return $this->CI->db->query($this->getQuery($param))->result();
    }

    public function getRow($param= '')
    {
        return $this->CI->db->query($this->getQuery($param))->row();
    }

    public function getStatement()
    {
        return $this->getQuery();
    }
}
