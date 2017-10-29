var authJSON = {title:"Form Registrasi Akun",input:{username:{field:"username",label:"ID Pengguna",icon:"phone"},password:{field:"password",label:"Password Anda",icon:"eye"}},button:[{target:"guest/register",type:"btn-save-one",class:"btn btn-default",label:"Signup",icon:"fa fa-user"}],footer:'Sudah Punya akun?  <a href="javascipt:void()" class="link" target="login">Masuk Sistem</a>'}
//function formValidation(){
  //console.log('aaa');
  //$.validate();
$('#form-single').validate(role)
var role = {
  rules : {
    phone : {
      required : true,
      minlength : 6,
    }
  },
  messages : {
    phone : {
      required : "Wajib diisi",
      minlength : "minimal 6 karakter",
    }
  },
  submitHandler: function(form) {
    //form.submit();
    console.log(form)
  }
}
//}
