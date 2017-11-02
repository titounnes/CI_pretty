/*@eProject Technology, author: Harjito*/
/*

*/
function showList(){
  var html = '';
  $.each(dataList.menu, function(i, v){
    var btn = v.type == 'popup' ? 'info' : (v.type =='page' ? 'success' : 'warning');
    html += '<div class="col-sm-2" style="margin-bottom:10px">'+
      '<a href="#" class="btn btn-'+btn+'" '+(v.type=='popup' ? 'data-toggle="modal" data-target="#myModal"' : '')+' style="width:100%" target="'+v.target+'"><h1><span class="fa fa-'+v.icon+' fa-2x"></span></h1>'+
      '<p>'+v.label+'</p></a>'+
      '</div>'
  })
  $('#metro').html(html)
}
var callIMB = function(){
  triger.attr('disabled',false)
  $('#dialog-body').html('')
	getLib('showList','IMB/registrar/list');
}
var dataList = {
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
			icon : 'sign-in',
			label: 'IMB',
			target : 'callIMB',
      type: 'page'
		},
		{
			icon : 'list',
			label: 'Usaha',
			target : 'callList',
      type: 'page'
		},
		{
			icon: 'info',
			label: 'Keramaian',
			target: 'callInfo',
      type: 'page'
		},
		{
			icon: 'lightbulb-o',
			label: 'Hiburan',
			target: 'callHelp',
      type: 'popup'
		},
    {
			icon : 'list',
			label: 'Usaha',
			target : 'callList',
      type: 'popup'
		},
		{
			icon: 'info',
			label: 'Keramaian',
			target: 'callInfo',
      type: 'popup'
		},
		{
			icon: 'lightbulb-o',
			label: 'Hiburan',
			target: 'callHelp',
      type: 'popup'
		},
    {
			icon : 'list',
			label: 'Usaha',
			target : 'callList',
      type: 'popup'
		},
		{
			icon: 'info',
			label: 'Keramaian',
			target: 'callInfo',
      type: 'popup'
		},
		{
			icon: 'lightbulb-o',
			label: 'Hiburan',
			target: 'callHelp',
      type: 'popup'
		},
  	{
			icon : 'home',
			label: 'Home',
			target : 'callBack',
      type: 'back'
		}
	],
}
