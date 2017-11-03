/*@eProject Technology, author: Harjito*/
/*

*/
function showList2(){
  var html = '';
  $.each(dataList2.menu, function(i, v){
    var btn = v.type == 'popup' ? 'info' : 'warning';
    html += '<div class="col-sm-2 col-xs-4 col-sm-3" style="margin-bottom:10px">'+
      '<a href="#" class="btn btn-'+btn+'" '+(v.type=='popup' ? 'data-toggle="modal" data-target="#myModal"' : '')+' style="width:100%" target="'+v.target+'"><h1><span class="fa fa-'+v.icon+' fa-2x"></span></h1>'+
      '<p>'+v.label+'</p></a>'+
      '</div>'
  })
  $('#metro').html(html)
}
var callIMB = function(){
  triger.attr('disabled',false)
  $('#dialog-body').html('')
	getLib('showIMB','IMB');
}
var dataList2 = {
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
  gallery : [
    {
      src : 'assets/img/1.png',
      caption : 'Judul 1',
      description : 'Ini judul 1',
    },
    {
      src: 'assets/img/2.png',
      caption: 'Judul 2',
      description: 'Ini Judul 2',
    },
  ]
}
