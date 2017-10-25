<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>e-Project | Integrated LMS in AIS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="E-learning terintegrasi Sistem Informasi Akademik">
        <meta content='id' name='language'/>
        <meta content='id' name='geo.country'/>
        <meta content='Indonesia' name='geo.placename'/>
        <meta name="keywords" content="e-Learning,UNBK,Akademik">
        <meta name="author" content="Harjito, zano.amrhakim@gmail.com">
        <link rel="shortcut icon" href="/assets/img/favicon.ico" type="image/x-icon">
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"><!--ADMIN-lte-->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/2.3.8/css/AdminLTE.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/2.3.8/css/skins/_all-skins.min.css" />
        <link href="/assets/css/styles.css?m=<?=filemtime(FCPATH.'assets/css/styles.css')?>" rel="stylesheet" type="text/css"/>
        <link rel="manifest" href="/manifest.json">
    </head>
    <body class="skin-blue" id="pbl" onload="loader();">
        <div id="help" style="display:none">
            <h5>PANDUAN PENGGUNA<a href="#" class="btn btn-close-help pull-right">X</a></h5>
            <div id="helpContent">aaa</div>
        </div>
        <div id="splashTest" style="display:none"></div>
        <div id="myTest" style="display:none">
            <div id="hint" class="minimize"></div> 
            <div id="navigation"></div>
            <div id="timer">
                <span id="hourTest"></span>
                <span> : </span>
                <span id="minuteTest"></span>
                <span> : </span>
                <span id="secondTest"></span>
            </div>
            <div id="question">
                <label>Soal No <span id="question-number"></span> dari <span id="question-total"></span></label>
                <div id="question-text" ></div>
            </div>
            <div id="option" style="text-align:left;padding-left:20px">
                <label>Opsi Jawaban</label>
                <div id="list-option" ></div> 
            </div>
            <div id="media" style="position:absolute;top:-500px;"></div>
            <div id="buttonbar"></div>
            <div id="close"></div>
        </div>
        <div id="sheetAssessment" style="display:none">
            <a href="#" class="btn btn-danger btn-close pull-right" type="close-assessment"><i class="fa fa-power-off"></i>  Selesai</a>
           <div id="subject" class="pull-left minimize">
                <ul class="nav nav-tabs" id="navSubject">
                </ul>
                <div id="viewSubject" class="text-center minimize" style="padding-right:20px;padding-left:20px;width:98%;overflow-x:auto;overflow-y:auto">
                </div>
            </div>
            <div id="panelInstrument" class="pull-right">
                <div id="panelInstrumentReview">
                </div>
                <div id="viewInstrumentReview">
                    <div id="viewInstrument"></div>
                    <h4 class="rubric">Comentar (Wajib)</h4>
                    <textarea id="comment" class="form-control rubric" name="comment" style="min-height:38px"></textarea>
                    <div id="viewRubric" class="rubric">
                    </div>
                </div>
            </div>
        </div>
        <div id="loader-bar" style="display:none;position:absolute;margin-left:50%;margin-top:200px;z-index:9999"></div>
        <div id="myModal" class="modal fade in" role="dialog">
            <div class="modal-dialog" id="dialog-body"></div>
            <div id="text-body"></div>
        </div>
        <div id="page" class="wrapper" style="background-color: #ffffff">
            <header class="main-header" id="navbar"> 
                <a href="#" class="logo">
                    <b>e-Project</b>
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
            <div id="tooltip" class="text-center text-tool" style="display:none"></div>
            <footer class="footer main-footer text-right" style="background-color:rgba(238, 238, 238, 0.58);height:0px;padding:0 0 0 0;"></footer>
            <div id="footer" class="text-center"><b><a href="#" data-toggle="modal" data-target="#myModal" id="logo">e-Project</a><span class="minimize"> Version</span></b><span class="minimize"> 1.0<strong>Copyright © 2014-2016 .</strong> All rights reserved.</span></div>
        </div>
        <div id="screen" style="display:none"></div>
        <div id="message" style="display:none"></div>
        <iframe name="uploadFrame" id="uploadFrame" style="display:none">
        </iframe>
        <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
        <script src="/assets/plugins/jquery.table2excel.min.js"></script>
        <script src="//cdn.ckeditor.com/4.6.1/full/ckeditor.js"></script>
        <!--jquery-ui-->
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="  crossorigin="anonymous"></script>
        <!--BOOTSTRAP-->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/2.3.8/js/app.min.js"></script>  
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-form-validator/2.3.26/jquery.form-validator.min.js"></script>
        <script src="/assets/plugins/jquery.readmore.min.js"></script>
        <script type="text/javascript">
            $('#side-container').css({'height':window.innerHeight-$('#navbar').height()-$('#footer').height()})
            $('#workspace').css({'height':window.innerHeight-$('#navbar').height()-$('#footer').height()});
            $('#panelInstrument').css({'height':window.innerHeight-$('#navbar').height()-$('#footer').height()});
        </script>       
        <script src="assets/js/event.js?a=<?=filemtime(FCPATH.'assets/js/event.js')?>" type="text/javascript"></script>     
        <script src="assets/js/md5.js?a=<?=filemtime(FCPATH.'assets/js/md5.js')?>" type="text/javascript"></script>     
    </body>
</html>
