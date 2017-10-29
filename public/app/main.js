/*@eProject Technology, author: Harjito*/
/*function callFunc(param){
  var myFunc = new Function("return "+param)
  myFunc();
}*/
if (typeof sessionStorage['token'] == 'undefined') {
  sessionStorage['token'] = localStorage['token'];
}
function baseUrl(param) {
  if (param.indexOf('.js') > -1) {
    return '/app/' + param;
  }
  return '/app/' + param + '.js';
}
function setSession(response) {
  sessionStorage['token'] = response.token;
  if(response.status=='login'){
    localStorage['token'] = response.token;
  }
}
function getSession() {
  if (typeof sessionStorage['token'] == 'undefined' || sessionStorage['token'] == false) {
    return 0;
  }
  if(sessionStorage['token'] !='' || sessionStorage['token']!= false){
      return sessionStorage['token'];
  }
  return localStorage['token']
}
function getJSON(callback, method) {
  ajaxRequest(callback, method)
}
function getLib(callback, method, prm) {
  paramUrl = typeof prm != 'undefined' ? prm : '';
  ajaxRequest(callback, '/app/lib/'+method+'.js');
}
function getView(user,path){
  return 'app/user/'+user+'/view/'+path.replace(/_/,'/')+'.js';
}
function parseToken(token){
  var payload = token.split('.')[1];
  var payload = payload.replace(/-/,'+').replace(/_/,'/');
  return JSON.parse(window.atob(payload));
}
function debugUrl(url){
  console.log(domain+url+'/?token='+getSession())
}
function ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function toSnake(string){
  var strs = string.split('_');
  var out = '';
  $.each(strs, function(i, v){
    out += ucfirst(v);
  })
  return out;
}
function ajaxRequest(callback, url){
  var d = new Date();
  $.ajax({
    cache : false,
    beforeSend: function(){
      inProgess = true;
    },
    url: url+'?v='+d,
    success: function(response){
      if(callback!=''){
        var tmpFunc = new Function(callback+'('+JSON.stringify(response)+')');
        tmpFunc();
      }
    },
  });
}
function sendRequest(callback, method, data) {
  data = typeof data == 'undefined' ? '' : data;
  if(data=='{&}'){
    showAlert('','Tidak ada data yang diubah');
    return false;
  }
  if(action){
    return false;
  }
  $.ajax({
    url: domain + method,
    method: 'POST',
    data: data,
    headers: {
      "Bearer": getSession()
    },
    success: callback,
    complete: function(response) {
      action = false;
    },
    error: function() {
      showAlert('danger', 'Ups.. Ada makalah. Periksa kembali koneksi internet anda... ');
    },
  });
}
function loader() {
  sessionStorage['token'] = localStorage['token'];
  homeScreen();
}
function homeScreen(){
  if(sessionStorage['token']=='' || sessionStorage['token']== false){
    clientPanel()
  }else{
    var infoUser = parseToken(sessionStorage['token']);
    if(infoUser.roles[0]=='registrar'){
      clientPanel();
    }else{
      adminPanel();
    }
  }
}
function clientPanel(){
  $('#page').hide();
  $('#home').show();
  getLib('showHome','home');
}
function adminPanel(){
  $('#page').show();
  $('#home').hide();
  getLib('showMenu', 'menu');
  getJSON('greetingView',getView('home','greeting'));
}
$(document).on('click', '.btn, .link', function(e){
  e.preventDefault();
  if(typeof $(this).attr('target')=='undefined'){
    return false;
  }
  var callFunc = new Function($(this).attr('target')+"()")
  return callFunc();
})
$(document).on('keyup','.form-control', function(){
  $('#'+$(this).prop('name')+'Message').html('')
})
$(document).keyup(function(e) {
  switch (e.which) {
    case 27:
      $('#myModal').modal('hide');
      break;
    case 113:
      if($('#dialog-body').html()==''){
        return false;
      }
      $('#myModal').modal('show');
      break;
  }
})
function calllogout() {
  localStorage['token'] = '';
  sessionStorage['token'] = '';
  clientPanel();
}
function showAlert(type, message) {
  $('.alert').addClass(type).html(message).show(message)
  setTimeout(function() {
    $('.alert').fadeOut()
  }, 3000)
}
var action =false;
