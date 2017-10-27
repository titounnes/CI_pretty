/*@eProject Technology, author: Harjito*/
function showLogin() {
  var html = '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<h2 class="modal-title"><span class="fa fa-' + content.icon + '"></span> ' + content.title +
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
    '<span aria-hidden="true">&times;</span>' +
    '</button></h2>' +
    '</div>' +
    '<div class="modal-body">' +
    '<form class="container" id="form-login" novalidate>'
    $.each(content.field, function(i, v) {
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
    '<div class="row">Belum punya akun? <a href="#" id="signup" class="btn-login" target="signup">Buat Akun</a></div>' +
    '<div class="row">Tidak bisa login? <a href="#" id="forgot" class="btn-login" target="forgot">Bantuan Lupa Password</a></div>' +
    '</div><div class="alert" role="alert" style="display:none"></div>'
  $('#dialog-body').html(html);
  $('#myModal').css({
    'padding-top': '100px'
  })
}
var content = {
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
$(document).on('keyup','.form-control', function(){
  $('#'+$(this).prop('name')+'Message').html('')
})
$(document).on('click','.btn-login', function(e){
  e.preventDefault();
  var myFunc = new Function("return "+$(this).attr('target')+"()")
	myFunc();
})
function submitLogin(){
  var valid = true;
  $.each(content.field,function(i, v){
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
    sendRequest(responseLogin, 'guest/login', $('#form-login').serialize());
  }
}
function responseLogin(response){
  if(response.status=='login'){
      localStorage['token'] = sessionStorage['token'] = response.token;
      $('#myModal').modal('hide');
      $('#dialog-body').html('')
  }
  var myFunc = new Function("return "+response.status+"_call()")
	myFunc();
}
function pass_mismatch_call(){
  showAlert('alert-warning', 'Password salah')
}
function login_call(){
  infoUser = parseToken(sessionStorage['token']);
  if(infoUser.roles[0]=='registrar'){
    clientPanel()
  }else{
    adminPanel();
  }
}
function signup(){
	getLib('showSignup','signup');
}
