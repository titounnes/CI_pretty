/*@eProject Technology, author: Harjito*/
function showHome(){
	var html = '<div class="jumbotron jumbotron-fluid" id="home-icon"><div class="container">';
	$.each(content.title, function(i, v){
		html += '<h'+(2-i)+' class="text-center">'+v+'</h'+(2-i)+'>';
	})
	html += '<div id="btn-group">';
	$.each(content.menu, function(i, v){
		if(sessionStorage['token']!=''){
			if(v.target!='login'){
				var btn = v.target == 'logout' ? 'danger' : 'info';
				html += '<a href="#" id="'+v.target+'_btn" class="btn btn-'+btn+' btn-home" target="'+v.target+'"><h1><span class="fa fa-'+v.icon+'"></span><br>'+v.label+'</h1></a>';
			}
		}else{
			if(v.target!='submission' && v.target !='logout'){
				var btn = v.target == 'login' ? 'success' : 'info';
				html += '<a href="#" id="'+v.target+'_btn" class="btn btn-'+btn+' btn-home" target="'+v.target+'"><h1><span class="fa fa-'+v.icon+'"></span><br>'+v.label+'</h1></a>';
			}
		}
	})
	html +=	'</div></div></div>';
	$('#home').html(html)
}
var info = function(){
	console.log('a')
}
var login = function(){
	$('#myModal').modal('show');
	getLib('showLogin','login');
}
var website = function(){
	console.log('a')
}
var submission = function(){
	console.log('test')

}
var logout = function(){
	localStorage['token'] = '';
  sessionStorage['token'] = '';
  showHome();
}
var content = {
	title : [
		'Apikasi Web Service - Frontend',
	 	'eProject Technology',
	],
	footer : [
		'website ',
		'email'
	],
	menu : [
		{
			icon : 'key',
			label: 'Masuk',
			target : 'login'
		},
		{
			icon : 'list',
			label: 'Formulir',
			target : 'submission'
		},
		{
			icon: 'info',
			label: 'Info',
			target: 'info',
		},
		{
			icon: 'question',
			label: 'Bantuan',
			target: 'help'
		},
		{
			icon : 'sign-out',
			label: 'Keluar',
			target : 'logout'
		}
	]
}
