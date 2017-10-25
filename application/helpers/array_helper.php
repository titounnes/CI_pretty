<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('obj2option')){
  function obj2option($param, $val=[], $label = 'Pilih Salah satu')
  {
    $output[''] = $label;
    if(count($param)>0) 
    {
      foreach($param as $row) 
      {
        $output[$row->{$val[0]}] = $row->{$val[1]};
      }
    }
    return $output;
  }
}


if ( ! function_exists('object2optionMulti')){
  function obj2optionMulti($param, $val=[],$label='Pilih Salah Satu')
  {
    $output['']=$label;

    if(count($param)>0) 
    {
      foreach($param as $row) 
      {
        if(is_object($row))
        {
          if(isset($row->{$val[1]}))
          {
            $output[$row->{$val[1]}][$row->{$val[0]}] = $row->{$val[2]};
          }
        }
        else
        {
          if(isset($row[$val[0]]))
          {
            $output[$row[$val[1]]][$row[$val[0]]] = $row[$val[2]] ;
          }
        }
      }
    }
    return $output;
  }
}


if ( ! function_exists('data_list'))
{
  function data_list($data)
  {
    $output='';
    if($data['list'])
    {
      foreach($data['list'] as $opt)
      {
          $output.='<option class="list">'.$opt.'</option>';
      }
    }
    return $output;
  }
}

if ( ! function_exists('data_option'))
{
  function dataOption($data)
  {
    $output='';
    if($data)
    {
      foreach($data as $key=>$opt)
      {
          if(is_array($opt)){
              $output.='<optgroup label="'.$key.'">';
              foreach($opt as $k=>$v)
              {
                $output .= '<option value="'.$k.'">'.$v.'</option>';
              }
              $output.='</optgroup>';              
          }
          else
          {
            if($key=='') $output.='<option value="" selected>'.$opt.'</option>';
              else $output.='<option class="list" value="'.$key.'">'.$opt.'</option>';
          }        
      }
    }
    return $output;
  }
}

if ( ! function_exists('date_id'))
{
  function date_id($date)
  {
    $month = ['Januari','Februari','Maret','April','Mei','Juni',
      'Juli','Agustus','September','Oktober','Nopember','Desember'];
    return date('d',strtotime($date)).' '.$month[date('m',strtotime($date))*1-1].' '.date('Y',strtotime($date));
  }
}

if ( ! function_exists('duration'))
{
  function duration($start='',$finish=0,$t='m')
  {
    if($start==''){
      $start=date('Y-m-d H:i:s');
    }
    switch(strtolower($t))
    {
      case 'second' : $div=1;break;
      case 'hour' : $div=60*60;break;
      case 'day' : $div=24*60*60;break;
      case 'week' : $div=7*24*60*60;break;
      case 'month' : $div=7*24*60*60;break;
      default : $div=60;break;
    }
    return (strtotime($finish)-strtotime($start))/$div;
  }
}

if ( ! function_exists('inTime'))
{
  function inTime($start='',$finish=0,$t='m')
  {
    $now=strtotime(date('Y-m-d H:i:s'));
    $start=strtotime($start);
    $finish=strtotime($finish);
    return ($now>$start && $now<$finish);
  }
}

if ( ! function_exists('token'))
{
  function token(){
    $str='0123456789abcdefghijklmnopqrstuvwxyz';
    return substr(str_shuffle($str), 0,8) ;
  }
}

if ( ! function_exists('in_time'))
{
  function in_time($time,$start=0,$finish=0)
  {
    $time=strtotime($time);
    $start=strtotime($start);
    $finish=strtotime($finish);
    return $start-$time>0?1:($finish-$time>0?0:-1);
  }
}


if ( ! function_exists('split_keyword'))
{
  function split_keyword($field,$keyword='')
  {
    $where=array();
    $like=explode(' ',str_replace('%20', ' ',$keyword));
    if(count($like)>0)
    {
      foreach($like as $word){
        $where[]=$field." like '%".$word."%' ";
      }
      return implode(" or ",$where);
    }
    else
    {
      return '1=1';
    }
  }
}
