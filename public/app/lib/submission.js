/*@eProject Technology, author: Harjito*/
function showSubmission() {
  var html = '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<h2 class="modal-title"><span class="fa fa-' + contentSubmission.icon + '"></span> ' + contentSubmission.title +
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
    '<span aria-hidden="true">&times;</span>' +
    '</button></h2>' +
    '</div>' +
    '<div class="modal-body">' +
    '<form class="container" id="form-login" novalidate>'
    $.each(contentSubmission.field, function(i, v) {
      html += '<div class="row">' +
        '<div class="input-group col-md-7 col-sm-9 col-lg-5 mb-3">'
        if(v.type =='text'){
          html += '<input type="'+v.type+'" class="form-control input-login" name="' + v.name + '" id="' + v.name + '" placeholder="' + v.label + '" value="">'
        }else if(v.type=='select'){
          html += '<select class="form-control input-login" name="' + v.name + '" id="' + v.name + '" placeholder="' + v.label + '" >'
          $.each(v.option, function(j, w){
            html += '<option value="'+j+'">'+w;
          })
          html += '</select>'
        }
        html += '<div class="input-group-addon"><span class="fa fa-' + v.icon + '"></span></div>' +
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
var contentSubmission = {
  title: 'Formulir Pengajuan Ijin',
  icon: 'list',
  footer: [
    'website ',
    'email'
  ],
  field: [{
      icon: 'user',
      label: 'Nama Perusahaan',
      name: 'business_name',
      type: 'text',
      regex: /([a-zA-Z0-9_.'" ]){6,100}/i,
      message: '6-100 karakter'
    },
    {
      icon: 'eye',
      label: 'Jenis Badan Usaha',
      name: 'busines_type',
      type: 'select',
      option: ['Pilih Jenis Badan Usaha','Perseroan Terbatas','CV'],
      regex: /([1-9]){6,20}/i,
      message: 'Pilih salah satu'
    },
  ]
}
function submitSignup(){
  var valid = true;
  $.each(contentSubmission.field,function(i, v){
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
    sendRequest(responseLogin, 'guest/register', $('#form-login').serialize());
  }
}
function responseLogin(response){
  triger.attr('disabled',false)
  if(typeof response.validation != 'undefined'){
    showAlert('alert-danger', response.validation.message)
    return false;
  }
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
