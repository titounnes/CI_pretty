/*@eProject Technology, author: Harjito*/
/*

*/
function showHome(){
  var j = 0;
	var html = '<nav class="navbar navbar-inverse">'+
	  '<div class="container-fluid">'+
	    '<div class="navbar-header">'+
	      '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">'+
	        '<span class="icon-bar"></span>'+
	        '<span class="icon-bar"></span>'+
	        '<span class="icon-bar"></span>'+
	      '</button>'+
	      '<a class="navbar-brand" href="#">Logo</a>'+
	    '</div>'+
	    '<div class="collapse navbar-collapse" id="myNavbar">'+
			'<ul class="nav navbar-nav">'
			$.each(dataHome.menu, function(i, v){
        if(sessionStorage['token']!=''){
          if(v.target!='callLogin' && v.target !='callLogout'){
      	     html += '<li><a href="#" class="link" target="'+v.target+'">'+
                '<span class="fa fa-'+v.icon+'"></span> '+
                v.label+'</a></li>';
              j++;
          }
        } else {
          if(v.target!='callLogin' && v.target!='callSubmission' && v.target !='callLogout'){
            html += '<li><a href="#" class="link" target="'+v.target+'">'+
               '<span class="fa fa-'+v.icon+'"></span> '+
               v.label+'</a></li>';
             j++;
           }
        }
			})
			html += '</ul>'+
      '<ul class="nav navbar-nav navbar-right">'+
        '<li><a href="#" class="link" target="'+(sessionStorage['token']=='' ? 'callLogin' : 'callLogout')+'" data-toggle="modal" data-target="#myModal" ><span class="fa fa-sign-'+(sessionStorage['token']=='' ? 'in' : 'out')+'"></span> '+(sessionStorage['token']=='' ? 'Login' : 'Logout')+'</a></li>'+
	      '</ul>'+
	    '</div>'+
	  '</div>'+
	'</nav>'+
  '<div id="myCarousel" class="carousel slide" data-ride="carousel">'+
      '<ol class="carousel-indicators">'
      $.each(dataHome.gallery, function(i, v){
        html += '<li data-target="#myCarousel" data-slide-to="'+i+'" '+(i==0 ? 'class="active"' : '')+'></li>'
      })
      html += '</ol>'+
      '<div class="carousel-inner" role="listbox">'
      $.each(dataHome.gallery, function(i, v){
        html += '<div class="item '+(i==0 ? 'active' : '')+'">'+
          '<img src="'+v.src+'" alt="" style="height:200px">'+
          '<div class="carousel-caption">'+
            '<h3>'+v.caption+'</h3>'+
            '<p>'+v.description+'.</p>'+
          '</div>'+
        '</div>'
      })
      html += '</div>'+
    '<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">'+
        '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'+
        '<span class="sr-only">Previous</span>'+
      '</a>'+
      '<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">'+
        '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'+
        '<span class="sr-only">Next</span>'+
      '</a>'+
  '</div>'+
  '<div class="container text-center">'+
    //'<h1>'+dataHome.title[0]+'</h1>'+
    '<h2>'+dataHome.title[1]+'</h2>'+
    '<div class="row">'
      var j =0;
      $.each(dataHome.menu, function(i, v){
        if(sessionStorage['token']!=''){
          if(v.target!='callLogin'){
      			var btn = v.target == 'callLogout' ? 'danger' : 'info';
    				html += '<div class="col-sm-4" style="margin-bottom:10px">'+
              '<a href="#" class="btn btn-'+btn+'" data-toggle="modal" data-target="#myModal" style="width:100%" target="'+v.target+'"><h1><span class="fa fa-'+v.icon+' fa-2x faa-horizontal animated"></span></h1>'+
              '<p>'+v.label+'</p></a>'+
              '</div>'
              j++;
            }
          } else {
            if(v.target!='callSubmission' && v.target !='callLogout'){
        			var btn = v.target == 'callLogin' ? 'success' : 'info';
      				html += '<div class="col-sm-4">'+
                '<a href="#" data-toggle="modal" data-target="#myModal" class="btn btn-'+btn+'" style="width:100%" target="'+v.target+'"><h1><span class="fa fa-'+v.icon+' fa-2x faa-horizontal animated"></span></h1>'+
                '<p>'+v.label+'</p></a>'+
                '</div>'
              }
              j++;
          }
      })
      html += '</div>'+
  '</div>'+
  '<footer class="container-fluid text-center">'+
    '<p>'+dataHome.footer[0]+'</p>'+
    '<p>'+dataHome.footer[1]+'</p>'+
  '</footer>'
	html +=	'</div></div></div>';
	$('#home').html(html)
}
var callInfo = function(){
  $('#dialog-body').html('')
	getLib('showInfo','info');
}
var callLogin = function(){
  $('#dialog-body').html('')
	getLib('showLogin','login');
}
var callHelp = function(){
  $('#dialog-body').html('')
	getLib('showHelp','help');
}
var callSubmission = function(){
  $('#dialog-body').html('')
	getLib('showSubmission','submission');
}
var callLogout = function(){
  var html = '<div class="modal-content">'+
    '<div class="modal-header">'+
    '<span class="fa fa-exclamation"></span> Konfirmasi'+
    '</div>'+
    '<div class="modal-body">'+
    '<div class="text-center"><h3>Yakin akan keluar?</h3></div>'+
    '</div>'+
    '<div class="modal-footer">'+
    '<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>'+
    '<a class="btn btn-danger" data-dismiss="modal" target="confirmLogout">Logout</a>'+
    '</div>'+
    '</div>'
  $('#dialog-body').html(html)
}
var confirmLogout = function(){
  localStorage['token'] = '';
  sessionStorage['token'] = '';
  showHome();
}
var dataHome = {
	title : [
		'Apikasi Web Service - Frontend',
	 	'eProject Technology',
	],
	footer : [
		'website ',
		'email'
	],
	menu : [
		{
			icon : 'sign-in',
			label: 'Masuk',
			target : 'callLogin'
		},
		{
			icon : 'list',
			label: 'Formulir',
			target : 'callSubmission'
		},
		{
			icon: 'info',
			label: 'Info',
			target: 'callInfo',
		},
		{
			icon: 'lightbulb-o',
			label: 'Bantuan',
			target: 'callHelp'
		},
  	{
			icon : 'sign-out',
			label: 'Keluar',
			target : 'callLogout'
		}
	],
  gallery : [
    {
      src : 'assets/img/1.png',
      caption : 'Judul 1',
      description : 'Ini judul 1',
    },
    {
      src: 'assets/img/2.png',
      caption: 'Judul 2',
      description: 'Ini Judul 2',
    },
  ]
}
