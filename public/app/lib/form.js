var action;
/*function validateInit(){
	$.validate({
		form : '#form-single',
	    modules : 'html5',
	    validateOnBlur : true, // disable validation when input looses focus
	    onElementValidate : function(valid, $el, $form, errorMess) {
	        if(! valid){
	      		validForm = false;
	        	$el.focus();
	       	}else{
	       		validForm = true;
	        }
		},
	});
}*/
function getForm(user,path){
  return 'app/user/'+user+'/form/'+path.replace(/_/,'/')+'.js';
}
function showForms(response){
	var tag = '<div class="jumbotron"><h2 id="g-title">loading...</h2><div id="g-body"></div><div class="well well-lg"><span class="pull-left" id="g-footer"></span></div>';
	$('#workspace').html(tag);
	$('#g-title').html(authJSON.title);
	form = '<form id="form-single" class="form-horizontal" autocomplete="off">';
	$.each(authJSON.input, function(i, v){
		switch(v.field)
		{
			case 'password' :
			case 'old_password' :
			case 'new_password' :
				form += cellPassword(v); break;
			case 'email' : form += cellEmail(v); break;
			default :  form += cellText(v); break;
		}
	})
	//form += '<button id="validate" class="btn" value="Validate" style="display:"none"></button>';
	form += '</form>';
	$.each(authJSON.button, function(i,v){
		form += cellButton(v);
	})
	$('#g-body').html(form);
	$('#g-footer').html(authJSON.footer);
	//validateInit();
}
function authForm(){
	getJSON('showForms', getForm('home',paramUrl));
}
function formOpen(){
	var target = objTriger.attr('target').split('/');
	$('#myModal').modal('show');
	action = target[2];
	getJSON('showForm', getForm(target[0],target[2]))
}
function showForm(){
	$('#dialog-body').css({'max-width':'600px'})
	$('#dialog-body').html('<h3 class="text-info text-center">'+formItem.title+'</h3>').show();
	$('#dialog-body').append('<form id="form-single" class="form-horizontal"></form>')
	$.each(formItem.field, function(i,v){
		if(v.type != 'hidden'){
			var row = '<div class="form-group">';
			row += '<label class="control-label col-sm-4" for="'+v.field+'">'+v.label+'</label>';
			row += '<div class="col-sm-8">';
		}else{
			row = '';
		}
		switch(v.type){
			case 'select' : row += cellSelect(v,''); break;
			case 'text' : row += cellText(v,''); break;
			case 'textarea' : row += cellTextarea(v,''); break;
			case 'date' : row += cellDate(v,''); break;
			case 'date-time' : row += cellDateTime(v,''); break;
			case 'hidden' : row += cellHidden(v,''); break;
		}
		if(v.type != 'hidden'){
			row += '</div></div>';
		}
		$('#form-single').append(row);
	})
	$('#dialog-body').prepend('<a href="#" class="btn btn-default pull-right" type="btn-close"><span class="fa fa-close"></span></a>');
	$('#form-single').append('<div class="form-group"><div id="form-button" class="col-sm-offset-4 col-sm-8"></div></div>');
	$('#form-button').append(cellButton(formItem.button.save, action));
	$('#form-single').append('<input type="submit" id="validate" style="display:none">');
	$.validate({
		form : '#form-single',
	       modules : 'html5',
	       validateOnBlur : true, // disable validation when input looses focus
	       onElementValidate : function(valid, $el, $form, errorMess) {
	       	if(! valid){
	       		validForm = false;
	       		$el.focus();
	       	}else{
	       		validForm = true;
	       	}
		},
	});
}
