/*@eProject Technology, author: Harjito*/
/*

*/
function showHome() {
  var j = 0;
  var html = '<nav class="navbar navbar-inverse">' +
    '<div class="container-fluid">' +
    '<div class="navbar-header">' +
    '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">' +
    '<span class="icon-bar"></span>' +
    '<span class="icon-bar"></span>' +
    '<span class="icon-bar"></span>' +
    '</button>' +
    '<a class="navbar-brand" href="#">Logo</a>' +
    '</div>' +
    '<div class="collapse navbar-collapse" id="myNavbar">' +
    '<ul class="nav navbar-nav">'
  $.each(dataHome.menu, function(i, v) {
    if (sessionStorage['token'] != 'undefined' && sessionStorage['token'] != '') {
      if (v.target != 'callLogin' && v.target != 'callRegister' && v.target != 'callLogout') {
        html += '<li><a href="#" class="link" ' + (v.type == 'popup' ? 'data-toggle="modal" data-target="#myModal" ' : '') + ' target="' + v.target + '">' +
          '<span class="fa fa-' + v.icon + '"></span> ' +
          v.label + '</a></li>';
        j++;console.log(1);
      }
    } else {
      if (typeof v.login == 'undefined') {
        if (v.target != 'callLogin' && v.target != 'callSubmission' && v.target != 'callLogout') {
          html += '<li><a href="#" ' + (v.type == 'popup' ? 'data-toggle="modal" data-target="#myModal"' : '') + 'class="link" target="' + v.target + '">' +
            '<span class="fa fa-' + v.icon + '"></span> ' +
            v.label + '</a></li>';
          j++;
        }
      }
    }
  })
  html += '</ul>' +
    '<ul class="nav navbar-nav navbar-right">' +
    '<li><a href="#" class="link" target="' + (sessionStorage['token'] == '' ? 'callLogin' : 'callLogout') + '" data-toggle="modal" data-target="#myModal" ><span class="fa fa-sign-' + (sessionStorage['token'] == '' ? 'in' : 'out') + '"></span> ' + (sessionStorage['token'] == '' || sessionStorage['token'] == 'undefined' ? 'Login' : 'Logout') + '</a></li>' +
    '</ul>' +
    '</div>' +
    '</div>' +
    '</nav>' +
    '<div id="myCarousel" class="carousel slide" data-ride="carousel">' +
    '<ol class="carousel-indicators">'
  $.each(dataHome.gallery, function(i, v) {
    html += '<li data-target="#myCarousel" data-slide-to="' + i + '" ' + (i == 0 ? 'class="active"' : '') + '></li>'
  })
  html += '</ol>' +
    '<div class="carousel-inner" role="listbox">'
  $.each(dataHome.gallery, function(i, v) {
    html += '<div class="item ' + (i == 0 ? 'active' : '') + '">' +
      '<img src="' + v.src + '" alt="" style="height:200px">' +
      '<div class="carousel-caption">' +
      '<h3>' + v.caption + '</h3>' +
      '<p>' + v.description + '.</p>' +
      '</div>' +
      '</div>'
  })
  html += '</div>' +
    '<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">' +
    '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>' +
    '<span class="sr-only">Previous</span>' +
    '</a>' +
    '<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">' +
    '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>' +
    '<span class="sr-only">Next</span>' +
    '</a>' +
    '</div>' +
    '<div class="container text-center">' +
    //'<h1>'+dataHome.title[0]+'</h1>'+
    '<h2 id="company">' + dataHome.title[1] + '</h2>' +
    '<div class="row text-center" id="metro">'
  var j = 0;
  $.each(dataHome.menu, function(i, v) {
    if (sessionStorage['token'] != '' && sessionStorage['token'] != 'undefined') {
      if (v.target != 'callLogin' && v.target != 'callRegister') {
        var btn = v.target == 'callLogout' ? 'danger' : 'info';
        html += '<div class="col-sm-2 col-md-2" style="margin-bottom:10px">' +
          '<a href="#" class="btn btn-' + btn + '" ' + (v.type == 'popup' ? 'data-toggle="modal" data-target="#myModal"' : '') + ' style="width:100%" target="' + v.target + '"><h1><span class="fa fa-' + v.icon + ' fa-2x"></span></h1>' +
          '<p>' + v.label + '</p></a>' +
          '</div>'
        j++;
      }
    } else {
      if (typeof v.login == 'undefined') {
        if (v.target != 'callSubmission' && v.target != 'callLogout') {
          var btn = v.target == 'callLogin' ? 'success' : 'info';
          html += '<div class="col-sm-2 col-md-2">' +
            '<a href="#" ' + (v.type == 'popup' ? 'data-toggle="modal" data-target="#myModal"' : '') + ' class="btn btn-' + btn + '" style="width:100%" target="' + v.target + '"><h1><span class="fa fa-' + v.icon + ' fa-2x"></span></h1>' +
            '<p>' + v.label + '</p></a>' +
            '</div>'
        }
        j++;
      }
    }
  })
  html += '</div>' +
    '</div>' +
    '<footer class="container-fluid text-center">' +
    '<p>' + dataHome.footer[0] + '</p>' +
    '<p>' + dataHome.footer[1] + '</p>' +
    '</footer>'
  html += '</div></div></div>';
  $('#home').html(html)
}
var callInfo = function() {
  triger.attr('disabled', false)
  $('#dialog-body').html('')
  getLib('showInfo', 'info');
}
var callRegister = function() {
  triger.attr('disabled', false)
  $('#dialog-body').html('')
  getLib('showRegister', 'auth');
}
var callLogin = function() {
  triger.attr('disabled', false)
  $('#dialog-body').html('')
  getLib('showLogin', 'auth');
}
var callHelp = function() {
  triger.attr('disabled', false)
  $('#dialog-body').html('')
  getLib('showHelp', 'help');
}
var callBack = function() {
  getLib('showHome', 'home');
}
var callList = function() {
  $('#myCarousel').show()
  triger.attr('disabled', false)
  id = '';
  getLib('showList', 'list');
}
var callList2 = function() {
  $('#myCarousel').show()
  triger.attr('disabled', false)
  getLib('showList2', 'list2');
}
var dataHome = {
  title: [
    'Apikasi Web Service - Frontend',
    'eProject Technology',
  ],
  footer: [
    'website ',
    'email'
  ],
  menu: [{
      icon: 'sign-in',
      label: 'Masuk',
      target: 'callLogin',
      type: 'popup'
    },
    {
      icon: 'file',
      label: 'Buat Akun',
      target: 'callRegister',
      type: 'popup'
    },
    {
      icon: 'list',
      label: 'Ijin A',
      target: 'callList',
      type: 'page',
      login: true,
    },
    {
      icon: 'list',
      label: 'Ijin B',
      target: 'callList2',
      type: 'page',
      login: true
    },
    {
      icon: 'info',
      label: 'Info',
      target: 'callInfo',
      type: 'popup'
    },
    {
      icon: 'lightbulb-o',
      label: 'Bantuan',
      target: 'callHelp',
      type: 'popup'
    },
    {
      icon: 'sign-out',
      label: 'Keluar',
      target: 'callLogout',
      type: 'popup'
    }
  ],
  gallery: [{
      src: 'assets/img/1.png',
      caption: 'Judul 1',
      description: 'Ini judul 1',
    },
    {
      src: 'assets/img/2.png',
      caption: 'Judul 2',
      description: 'Ini Judul 2',
    },
  ]
}
