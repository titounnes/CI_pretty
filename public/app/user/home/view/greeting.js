var greetingJSON = {title:"Selamat datang di e-Project",body:'e-Project merupakan e-learning yang secara khusus digunakan untuk mengelola pembelajaran project-base learning dengan model penilaian otentik, yang melibatkan peserta didik pada pencapaian tujuan pembelajaran secara kolaboratif. <h5>Dikembangkan oleh: Harjito</h5> Download Aplikasi Android <a href="/eProject.apk">Di sini</a><h5>Contact: harjito(at)mail(dot)unnes(dot)ac(dot)id</h5>',footer:"Experience is the best teacher (Julius Caesar)"}
function greetingView(){
  var tag = '<div class="jumbotron"><h2 id="g-title">loading...</h2><div id="g-body"></div><div class="well well-lg"><span class="pull-right" id="g-footer"></span></div>';
  $('#workspace').html(tag);
  $('#g-title').html(greetingJSON.title);
  $('#g-body').html(greetingJSON.body);
  $('#g-footer').html(greetingJSON.footer);
}
