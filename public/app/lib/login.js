/*@eProject Technology, author: Harjito*/
function showLogin() {
  var html = '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<h2 class="modal-title"><span class="fa fa-' + contentLogin.icon + '"></span> ' + contentLogin.title +
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
    '<span aria-hidden="true">&times;</span>' +
    '</button></h2>' +
    '</div>' +
    '<div class="modal-body">' +
    '<form class="container" id="form-login" novalidate>'
    $.each(contentLogin.field, function(i, v) {
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
    '<div class="row"><a href="#" class="btn btn-success btn-login pull-left" target="submitLogin"><span class="fa fa-lock"></span> Login</a></div>' +
    '<div class="row">Belum punya akun? <a href="#" id="signup" class="link" target="callSignup">Buat Akun</a></div>' +
    '<div class="row">Tidak bisa login? <a href="#" id="forgot" class="link" target="callForgot">Bantuan Lupa Password</a></div>' +
    '</div><div class="alert" role="alert" style="display:none"></div>'
  $('#dialog-body').html(html);
  $('#myModal').css({
    'padding-top': '100px'
  })
  $('#dialog-body').css({'width':'600px'})
}
var contentLogin = {
  title: 'Masuk Sistem',
  icon: 'key',
  footer: [
    'website ',
    'email'
  ],
  field: [{
      icon: 'user',
      label: 'ID Pengguna',
      name: 'identity',
      type: 'text',
      regex: /([a-zA-Z0-9_.]){6,50}/i,
      message: '6-20 karakter'
    },
    {
      icon: 'eye',
      label: 'Kata Sandi',
      name: 'password',
      regex: /([a-zA-Z0-9._@]){6,20}/i,
      type: 'password',
      message: 'Harus diisi 6-20 karakter '
    },
  ]
}
function submitLogin(){
  var valid = true;
  $.each(contentLogin.field,function(i, v){
    if(typeof v.regex != 'undefined'){
      var regExp = v.regex;
      if(regExp.test($('#'+v.name).val()) == false)
      {
        $('#'+v.name+'Message').html('Harus diisi dengan format '+ v.message);
        valid = false;
        triger.attr('disabled',false)
        return false;
      }
  }
  })
  if(valid){
    valid = false;
    sendRequest(responseLogin, 'guest/login', $('#form-login').serialize());
  }
}
function responseLogin(response){
  triger.attr('disabled',false)
  if(typeof response.validation != 'undefined'){
    showAlert('alert-danger', response.validation.message)
    return false;
  }
  if(response.status=='login'){
      localStorage['token'] = sessionStorage['token'] = response.token;
      $('#myModal').modal('hide');
      $('#dialog-body').html('');
      homeScreen();
  }
  var myFunc = new Function('call'+toSnake(response.status)+"()")
	return myFunc();
}
function callPassMismatch(){
  showAlert('alert-warning', 'Password salah')
}
function callUnregister(){
  showAlert('alert-warning', 'Username tidak terdaftar')
}
function callSignup(){
  $('#dialog-body').html('')
	getLib('showSignup','signup');
}
