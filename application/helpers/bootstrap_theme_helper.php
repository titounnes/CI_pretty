<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
if ( ! function_exists('data_menubar_open'))
{
  function data_menubar_open()
  {
    $output= <<<EOL
      <header class="main-header"> 
        <a href="#" class="logo">
          <b>PBLAAMS</b>
        </a> 
        <nav class="navbar navbar-static-top" role="navigation">
          <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button"> 
            <span class="sr-only">Toggle navigation</span> 
          </a>
          <span id="panel_menu"> 
EOL;
  return $output;
  }
}

if ( ! function_exists('data_menubar'))
{
  function data_menubar($data)
  {
    $pict=$data['pict_profile']==''?'assets/dist/img/avatar.png':$data['pict_profile'];
    $output= <<<EOL
          <div class="navbar-custom-menu"> 
            <ul class="nav navbar-nav"> 
              <li class="dropdown user user-menu"> 
                <a href="#" class="dropdown-toggle" data-toggle="dropdown"> 
                  <img id="pict_bar" src="{$pict}" class="user-image" alt="User Image"/> 
                  <span class="hidden-xs">&nbsp{$data['name_user']}&nbsp</span>
                </a> 
                <ul class="dropdown-menu"> 
                  <li class="user-header"> 
                      <img data-href="auth/picture/load" id="pict_menu" src="{$pict}" class="img-circle btn-ajax" alt="User Image" data-toggle="modal" data-target="#myModal"/>
                    <p>&nbsp{$data['name_user']}&nbsp</p>
                  </li>
                  <li class="user-body">
                    <div class="col-xs-4 text-center">
                      <a href="#" data-href="auth/buildForm/email" class="btn-ajax" title="Change Email" data-toggle="modal" data-target="#myModal">
                        Ganti e-Mail
                      </a> 
                    </div>
                    <div class="col-xs-4 text-center"> 
                      <a href="#" data-href="auth/buildForm/password" class="btn-ajax" title="Change Password" data-toggle="modal" data-target="#myModal">
                        Ubah Password
                      </a>
                    </div>
                    <div class="col-xs-4 text-center"> 
                      <a href="#" data-href="auth/profile/load" class="btn-ajax" title="Change Profile" data-toggle="modal" data-target="#myModal">
                        Ubah Profil
                      </a> 
                    </div>
                  </li>
                  <li class="user-body"> 
                    <div class="pull-left"> 
                      
                    </div>
                    <div class="pull-right"> 
                      <a href="#" type="btn-exit" target="user/logout" class="btn btn-primary" title="Log Out">
                        Keluar
                      </a> 
                    </div>
                  </li>
                </ul> 
              </li>
            </ul> 
          </div>
EOL;
  return $output;
  }
}

if ( ! function_exists('data_menubar_nosession'))
{
  function data_menubar_nosession()
  {
    $output= <<<EOL
      
       <div class="navbar-custom-menu"> 
            <ul class="nav navbar-nav"> 
              <li class="dropdown user user-menu"> 
                <a href="#" class="dropdown-toggle" data-toggle="dropdown"> 
                  Panel <i class="fa fa-lock"></i>
                </a> 
                <ul class="dropdown-menu"> 
                  <li class="user-body">
                    <div class="col-xs-4 text-center">
                      <a href="#" class="panel-btn" data-href="panelLogin" title="Login">
                        Masuk Sistem
                      </a> 
                    </div>
                    <div class="col-xs-4 text-center"> 
                      <a href="#" class="panel-btn" data-href="panelRegister" title="Register">
                        Mendaftar
                      </a> 
                    </div>
                    <div class="col-xs-4 text-center"> 
                      <a href="#" class="panel-btn" data-href="panelForgot" title="Forgot Password">
                        Pulihkan Password
                      </a> 
                    </div>
                  </li>
                </ul> 
              </li>
            </ul> 
          </div>
EOL;
  return $output;
  }
}

if ( ! function_exists('icon')){
function icon($symbol=''){
    $output=<<<EOL
<i class="fa fa-{$symbol}"></i>
EOL;
    return $output;
    }
}

if ( ! function_exists('data_menubar_close')){
function data_menubar_close($symbol=''){
    $output=<<<EOL
          </span>
        </nav> 
      </header> 
      <aside class="main-sidebar"> 
        <section class="sidebar" style="max-height:300px;" id="sidebar_menu"> 
EOL;
    return $output;
    }
}

if ( ! function_exists('data_info'))
{
  function data_info($data)
  {
    $output=<<<EOL
      <section class="content">
          <div class="panel" style="">
              <div class="panel panel-header panel-info">
                <div class="panel-title">
                    <label>
                      <h3>{$data['title']}</h3>
                   </label>
                </div>
              </div>
              <div class="panel panel-body" style="margin-bottom:0px;">
EOL;
              if(isset($data['image']))
              {
                $output.='<span style="float:left">';
                $output.='<img class="img-circle" ';
                $src=$data['image']['src']==''?'assets/dist/img/avatar.png':$data['image']['src'];
                $output.='src="'.$src.'" ';
                $output.='id="'.$data['image']['id'].'" ';
                switch($data['image']['size'])
                {
                  case 'small' : $output.='width:"100px" height="100px" ';break;
                  case 'medium' : $output.='width:"200px" height="200px" ';break;
                  case 'big' : $output.='width:"400px" height="400px" ';break;
                }
                $output.='alter="User Image"/>';
                $output.="</span>";
              }
              foreach($data['field'] as $key=>$row)
              {
                $output.='<div class="row">';
                $output.='<label class="col-sm-4 control-label no-padding-right" for="'.$key.'">';
                $output.=$row['label'];
                $output.='</label>';
                $output.='<div class="col-sm-8">';
                $output.='<p>: '.$row['value'].'</p>';
                $output.='</div></div>';
              }
              $output.='</div></div></section>';
      return $output;
  }
}
