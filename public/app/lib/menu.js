/*@eProject Technology, author: Harjito*/
var menus = [];
var menuList = {
  teacher: "Guru",
  student: "Siswa",
  operator: "Operator",
  parentClassroom: "Wali Kelas",
  admin : "Administrator",
}
function getMenu(method){
  return 'app/menu/'+method+ '.js';
}
function menuTree(obj, route, deep){
  var menu = '';
	if(typeof(obj)=='object'){
		$.each(obj, function(i, v){
			if(typeof(v)=='object'){
				menu += '<li class="treeview">';
				menu += '<a href="#" level="'+deep+'"><i class="fa fa-caret-right"></i>'+i+'<i class="fa fa-angle-left pull-right"></i></a>';
			}else{
				menu += '<li class="item">';
				menu += '<a style="padding-top:9px;padding-bottom:9px;" href="#" target="'+route+'/view/'+i+'" class="btn-load btn-ajax-page" level="'+deep+'">'+v+'<i class="fa fa-'+(typeof(v)=='object' ?'caret-right': i)+'"></i></a>';
			}
			if(typeof(v)=='object'){
				menu += '<ul class="sidebar-menu" style="display: none; padding-left: 15px;">';
                menu += menuTree(v, route, deep+1);
			menu += '</ul>'
			}
			menu += '</li>';
		})
	}
	return menu;
}
function toggleMenu(obj){
	var parent = $(obj).parent().parent();
	$(parent).addClass('menu-open')
	$(parent).addClass('active');
	$(parent).css('display','block');
	return parent;
}
function showMenu(){
  var infoUser = parseToken(sessionStorage['token'])
  var roles = infoUser.roles;
	switcher = '<select class="swapper-switch form-control">';
  var j = 0;
  $.each(roles, function(i, v) {
    if (typeof menuList[v] != 'undefined') {
       currentUser=='' ? v : currentUser;
      switcher += '<option value="' + v + '">' + menuList[v] + '</option>';
      j++;
    }
  })
  switcher += '</select>';
  $('#sidebar').prepend('<li class="header">MAIN NAVIGATION</li>');
  if (j > 1) {
    $('#switch').html(switcher);
  }
  $('#menubar').load('app/user/home/view/userInfo.html?a=1');
  $.each(roles, function(i, v) {
    if (v != '') {
      getJSON('nodeMenu',getMenu(v));
    }
  })
}
function nodeMenu(){
  if(currentUser == ''){
    $('#sidebar').append(menuTree(menuItem, user, 0));
    currentUser = user;
  }
}
var currentUser = '';
