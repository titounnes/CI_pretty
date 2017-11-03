/*@eProject Technology, author: Harjito*/
function showForm(field, title, icon, hint, button, button2){
  var html = '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<h2 class="modal-title"><span class="fa fa-' + icon + '"></span> ' + title +
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
    '<span aria-hidden="true">&times;</span>' +
    '</button></h2>' +
    '</div>' +
    '<div class="modal-body">' +
    '<form class="container" id="form-login" novalidate>'
    $.each(field, function(i, v) {
      if(typeof v[button.toLowerCase()] != 'undefined'){
        html += '<div class="row">' +
          '<div class="input-group col-md-7 col-sm-9 col-lg-5 mb-3">' +
          '<input  id="input-'+(i+1)+'" type="'+v.type+'" class="form-control input-login" name="' + v.name + '" id="' + v.name + '" placeholder="' + v.label + '" value="">' +
          '<div class="input-group-addon"><span class="fa fa-' + v.icon + '"></span></div>' +
          '</div>' +
          '<div id="'+v.name+'Message"></div>'+
          '</div>'
        }
    })
    html += '</form>'+
    '</div>'+
    '<div class="modal-footer">' +
    '<div class="row"><a href="#" class="btn btn-success btn-login pull-left" target="submit'+button+'"><span class="fa fa-lock"></span> '+button+'</a> <span id="process"></span></div>' +
    '<div class="row">'+hint+' <a href="#" class="link" target="call'+button2+'">'+button2+'</a></div>' +
    '<div class="row">Tidak bisa login? <a href="#" id="forgot" class="link" target="callForgot">Bantuan Lupa Password</a></div>' +
    '</div>'
  $('#dialog-body').html(html);
  $('#myModal').css({
    'padding-top': '100px'
  })
  $('#dialog-body').css({'width':'600px'})
  $('#input-1').focus()
}
function showLogin() {
  showForm(contentAuth.field, 'Masuk Sistem', 'key', 'Belum punya akun?', 'Login', 'Register')
}
function showRegister() {
  showForm(contentAuth.field, 'Buat Akun', 'file-o', 'Sudah punya akun?', 'Register', 'Login')
}
var contentAuth = {
  field: [
    {
      icon: 'user',
      label: 'ID Pengguna / email',
      name: 'identity',
      type: 'text',
      regex: /([a-zA-Z0-9_.]){6,50}/i,
      message: '6-20 karakter',
      login: true,
    },
    {
      icon: 'user',
      label: 'ID Pengguna',
      name: 'username',
      type: 'text',
      regex: /([a-zA-Z0-9_.]){6,50}/i,
      message: '6-20 karakter',
      register: true,
    },
    {
      icon: 'user',
      label: 'Nama Pengguna',
      name: 'name',
      type: 'text',
      regex: /([a-zA-Z0-9 .,]){6,50}/i,
      message: '6-20 karakter',
      register: true,
    },
    {
      icon: 'eye',
      label: 'Kata Sandi',
      name: 'password',
      regex: /([a-zA-Z0-9._@]){6,20}/i,
      type: 'password',
      message: 'Harus diisi 6-20 karakter ',
      login: true,
      register: true,
    },
  ]
}
function submitLogin(){
  var valid = true;
  $.each(contentAuth.field,function(i, v){
    if(typeof v.regex != 'undefined' && typeof v.login != 'undefined'){
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
function submitRegister(){
  var valid = true;
  $.each(contentAuth.field,function(i, v){
    if(typeof v.regex != 'undefined' && typeof v.login != 'undefined'){
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
    sendRequest(responseRegister, 'guest/register', $('#form-login').serialize());
  }
}
function responseRegister(response){
  triger.attr('disabled',false)
  if(typeof response.validation != 'undefined'){
    showAlert('alert-danger', response.validation.message)
    return false;
  }
  var myFunc = new Function('call'+toSnake(response.status)+"()")
	return myFunc();
}
function callDuplicate(){
  showAlert('alert-warning', 'ID Pengguna sudah ada dalam sistem kami')
}
function callRegistered(){
  showLogin();
  showAlert('alert-success', 'Akun berhasil didaftarkan');
}
function callPassMismatch(){
  showAlert('alert-warning', 'Password salah')
}
function callUnregister(){
  showAlert('alert-warning', 'Username tidak terdaftar')
}
