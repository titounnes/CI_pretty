function confirmation(){
	var message = '';
	var id = objTriger.attr('target').split('/');
	switch(id[1]){
		case 'reset' :
			message = 'Soal dan jawaban akan diset ulang?';
			break;
		default :
			message = 'Data akan dihapus?';
			break;
	}
	$('.row_'+id[3]).addClass('selected');
	var pos =$('.row_'+id[3]).position();
	$('#popup').css({'zIndex':9999,'position':'absolute','left':pos['left'],'top':(pos['top'])});
	var confirm = '<div class="box-confirm text-center" style="border:solid 2px #c0c0c0;padding:20px 30px 20px 30px;background-color:#fff"><label style="text-align:center">'+message+'</label>';
	confirm += '<div class="text-center"><a href="#" class="btn btn-default" type="btn-close"><span class="fa fa-close"></span></a>';
	confirm += '<a href="#" class="btn btn-default" type="btn-confirm" target="'+objTriger.attr('target')+'"><span class="fa fa-check"></span></a></div>';
	$('#popup').html(confirm).show();
}
function popDown(){
	$('#popup').hide();
	$('.selected').removeClass('selected');
}
