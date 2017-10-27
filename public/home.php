<?php
define('APP', '/var/app/ijin/public/app/');
define('ASSETS', '/var/app/ijin/public/assets/');
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>BPPTPM - Kabupaten Demak | Pelayanan Periinan dan Penanaman Modal </title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Terdepan dalam pelayanan perijinan dan penanaman modal">
        <meta content='id' name='language'/>
        <meta content='id' name='geo.country'/>
        <meta content='Indonesia' name='geo.placename'/>
        <meta name="keywords" content="Perijinan,Penananaman Modal">
        <meta name="author" content="Harjito">
        <link rel="shortcut icon" href="favicon2.ico" type="image/x-icon">
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"><!--ADMIN-lte-->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/2.3.8/css/AdminLTE.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/2.3.8/css/skins/_all-skins.min.css" />
        <link href="/assets/css/styles.css?m=<?=filemtime(ASSETS.'/css/styles.css')?>" rel="stylesheet" type="text/css"/>
    </head>
    <body class="skin-blue" id="pbl" onload="loader();">
        <div id="home" style="display:none">
        </div>
        <div id="myModal" class="modal fade in" role="dialog">
            <div class="modal-dialog" id="dialog-body"></div>
            <!--<div id="text-body"></div>-->
        </div>
        <div id="page" class="wrapper" style="display:none;background-color: #ffffff">
            <header class="main-header" id="navbar">
                <a href="#" class="logo">
                    <b>BPPTPM</b>
                </a>
                <nav class="navbar navbar-static-top">
                    <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                        <span class="sr-only">Toggle navigation</span>
                    </a>
                    <span id="menubar">
                    </span>
                </nav>
            </header>
            <aside class="main-sidebar" id="side-container">
                <span id="switch"></span>
                <div class="sidebar">
                    <ul class="sidebar-menu" id="sidebar">
                    </ul>
                </div>
            </aside>
            <div  class="content-wrapper">
          <div id="workspace" class="content">
          </div>
          <div id="popup" class="row" style="display:none"></div>
          </div>
            <footer class="footer main-footer text-right" style="background-color:rgba(238, 238, 238, 0.58);height:0px;padding:0 0 0 0;"></footer>
            <div id="footer" class="text-center"><b><a href="#" data-toggle="modal" data-target="#myModal" id="logo">e-Project</a><span class="minimize"> Version</span></b><span class="minimize"> 1.0<strong>Copyright © 2014-2016 .</strong> All rights reserved.</span></div>
        </div>
        <div id="message" style="display:none"></div>
        <iframe name="uploadFrame" id="uploadFrame" style="display:none">
        </iframe>
        <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
        <script src="/app/main.js?a=<?=filemtime(APP.'main.js')?>" type="text/javascript"></script>
        <script src="/app/table2excel.min.js"></script>
        <script src="//cdn.ckeditor.com/4.6.1/full/ckeditor.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="  crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <script src="/app/pdfmake.min.js"></script>
        <script src="/app/vfs_fonts.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/2.3.8/js/app.min.js"></script>
        <script src="/app/jquery.readmore.min.js"></script>
        <script type="text/javascript">
            var domain = 'http://back.ijin.dev/';
            $('#side-container').css({'height':window.innerHeight-$('#navbar').height()-$('#footer').height()})
            $('#workspace').css({'height':window.innerHeight-$('#navbar').height()-$('#footer').height()});
            $('#panelInstrument').css({'height':window.innerHeight-$('#navbar').height()-$('#footer').height()});
        </script>
        <script src="/app/input.js?a=<?=filemtime(APP.'input.js')?>" type="text/javascript"></script>
        <script src="/app/md5.js?a=<?=filemtime(APP.'md5.js')?>" type="text/javascript"></script>
    </body>
</html>
