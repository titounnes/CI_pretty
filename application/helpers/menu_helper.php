<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
if ( ! function_exists('menuTree')){
    function menuTree($data, $route='',$deep=0)
    {
        if(is_array($data))
        {
            $deep+=1;
            foreach($data as $key => $val)
            {    
                if(is_array($val))
                {
                    echo '<li class="treeview">';
                    echo '<a href="#" level="'.$deep.'"><i class="fa fa-'.lang($key.'_icon').'"></i>'.(lang($route.ucfirst($key))==''?$key:lang($route.ucfirst($key))).'<i class="fa fa-angle-left pull-right"></i></a>';
                }
                else
                {
                    echo '<li class="item">';
                    echo '<a style="padding-top:9px;padding-bottom:9px;" id="'.$route.'_'.$key.'" href="#" data-href="'.$route.'/view/'.$key.'/'.($val).'" class="btn-load btn-ajax-page" data-target="#workspace" level="'.$deep.'"><i class="fa fa-'.(lang($key.'_icon')=='' || !is_array($val) ?'caret-right':lang($key.'_icon')).'"></i>'.(lang($route.ucfirst($key))==''?$key:lang($route.ucfirst($key))).'</a>';
                }
                if(is_array($val))
                {
                    echo '<ul class="sidebar-menu" style="display: none; padding-left: 15px;">';
                    menuTree($val,$route,$deep);
                    echo '</ul>';
                }
                echo '</li>';
            }
            
        }
    }
}