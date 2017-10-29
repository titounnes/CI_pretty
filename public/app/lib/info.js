/*@eProject Technology, author: Harjito*/
function showInfo() {
  var html = '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<h2 class="modal-title"><span class="fa fa-' + contentInfo.icon + '"></span> ' + contentInfo.title +
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
    '<span aria-hidden="true">&times;</span>' +
    '</button></h2>' +
    '</div>' +
    '<div class="modal-body">' +
    '<div class="jumbotron">'+
    '<h1>'+contentInfo.info.title+'</h1>'+
    '<p>'+contentInfo.info.content+'</p>'+
    '</div>'+
    '</div>'+
    '<div class="modal-footer">' +
    '<div class="row">Belum punya akun? <a href="#" id="signup" class="btn-login" target="signup">Buat Akun</a></div>' +
    '<div class="row">Tidak bisa login? <a href="#" id="forgot" class="btn-login" target="forgot">Bantuan Lupa Password</a></div>' +
    '</div><div class="alert" role="alert" style="display:none"></div>'
  $('#dialog-body').html(html);
  $('#myModal').css({
    'padding-top': '60px',
  })
  $('#dialog-body').css({'width':'80%'})
}
var contentInfo = {
  title: 'Informasi',
  icon: 'info',
  footer: [
    'website ',
    'email'
  ],
  info: {
    title: 'Lorem Ipsum',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  }
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
