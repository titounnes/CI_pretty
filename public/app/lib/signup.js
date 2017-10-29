/*@eProject Technology, author: Harjito*/
function showSignup() {
  var html = '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<h2 class="modal-title"><span class="fa fa-' + contentSignup.icon + '"></span> ' + contentSignup.title +
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
    '<span aria-hidden="true">&times;</span>' +
    '</button></h2>' +
    '</div>' +
    '<div class="modal-body">' +
    '<form class="container" id="form-login" novalidate>'
    $.each(contentSignup.field, function(i, v) {
      html += '<div class="row">' +
        '<div class="input-group col-md-7 col-sm-9 col-lg-5 mb-3">' +
        '<input type="'+v.type+'" class="form-control input-login" name="' + v.name + '" id="' + v.name + '" placeholder="' + v.label + '" value="">' +
        '<div class="input-group-addon"><span class="fa fa-' + v.icon + '"></span></div>' +
        '</div>' +
        '<div id="'+v.name+'Message"></div>'+
        '</div>'
    })
    html += '</form>'+
    '</div>'+
    '<div class="modal-footer">' +
    '<div class="row"><a href="#" class="btn btn-success btn-login pull-left" target="submitSignup"><span class="fa fa-lock"></span> Signup</a></div>' +
    '<div class="row">Masuk sistem? <a href="#" id="login" class="link" target="callLogin"> Login</a></div>' +
    '<div class="row">Tidak bisa login? <a href="#" id="forgot" class="link" target="callForgot">Bantuan Lupa Password</a></div>' +
    '</div><div class="alert" role="alert" style="display:none"></div>'
  $('#dialog-body').html(html);
  $('#myModal').css({
    'padding-top': '100px'
  })
  $('#dialog-body').css({'width':'600px'})
}
var contentSignup = {
  title: 'Buat Akun',
  icon: 'user',
  footer: [
    'website ',
    'email'
  ],
  field: [{
      icon: 'user',
      label: 'ID Pengguna',
      name: 'username',
      type: 'text',
      regex: /([a-zA-Z0-9]){5,20}/i,
      message: '6-20 karakter'
    },
    {
      icon: 'eye',
      label: 'Kata Sandi',
      name: 'password',
      type: 'password',
    },
  ]
}
function submitSignup(){
  var valid = true;
  $.each(contentSignup.field,function(i, v){
    if(typeof v.regex != 'undefined'){
      var regExp = v.regex;
      if(regExp.test($('#'+v.name).val()) == false)
      {
        $('#'+v.name+'Message').html('Harus diisi dengan format '+ v.message);
        valid = false;
        return false;
      }
  }
  })
  if(valid){
    valid = false;
    console.log($('#form-login').serialize())
    sendRequest(responseLogin, 'guest/register', $('#form-login').serialize());
  }
}
function responseLogin(response){
  if(response.status=='registered'){
      localStorage['token'] = sessionStorage['token'] = response.token;
      $('#dialog-body').html('');
      getLib('showLogin','login');
      return false;
  }
  var myFunc = new Function('call'+toSnake(response.status)+"()")
	return myFunc();
}
function callDuplicate(){
  showAlert('alert-warning', 'ID Pengguna sudah ada dalam sistem kami')
}
function callRegistered(){
  showAlert('alert-success', 'Akun berhasil didaftarkan');
  callLogin();
}
/*function callSignup(){
  $('#dialog-body').html('')
	getLib('showSignup','signup');
}*/
