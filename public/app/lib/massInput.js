var action;
function massInputOpen(){
	var target = objTriger.attr('target').split('/');
	action = target[2];
	$('#myModal').modal('show');
	getJSON('showFormMass',getForm(target[0],target[2]))
}
function showFormMass(){
	$('#dialog-body').css({'max-width':'600px'})
	$('#dialog-body').html('<h3 class="text-info text-center">'+formItem.title+'</h3>').show();
	$('#dialog-body').append('<form id="form-single" class="form-horizontal"></form>')
	$.each(formItem.field, function(i,v){
		if(v.type != 'hidden'){
			var row = '<div class="form-group" style="margin-bottom:0px">';
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
	$('#form-single').append('<textarea name="data" style="height:200px" class="form-control" placeholder="Salin data dari tabel"></textarea>');
	$('#dialog-body').prepend('<a href="#" class="btn btn-default pull-right" type="btn-close"><span class="fa fa-close"></span></a>');
	$('#form-single').append('<div class="form-group"><div id="form-button" class="col-sm-offset-4 col-sm-8"></div></div>');
	$('#form-button').append(cellButton(formItem.button.save, action));
	$('#form-single').append('<input type="submit" id="validate" style="display:none">');
	$('#form-single').append('<span id="message-mass"></span>');
}
function saveMass(){
	$('#message-mass').html('')
	var max =0;
	var field = {};
	var duplicateID = {};
	var filterID = {};
	var colUsername = $('[name=username]').val()*1;"\n"
	max = max < colUsername ? colUsername : max;
	var colName = $('[name=original_name]').val()*1;
	max = max < colName ? colName : max;
	var colPassword = $('[name=password]').val()*1;
	max = max < colPassword ? colPassword : max;
	var colGender = $('[name=gender]').val()*1;
	max = max < colGender ? colGender : max;
	field[colUsername] = 'username';
	field[colName] = 'original_name';
	field[colGender] = 'gender';
	field[colPassword] = 'password';
	var lines = $('textarea[name=data]').val().split("\n");
	var line =0;
	var str = '{&';
	$.each(lines, function(i, v){
		if(v!=''){
			line++;
			var cols = v.split("\t");
			if(cols.length<max){
				showAlert('','Banyak kolom tidak sesuai');
				return false;
			}
			$.each(cols, function(j, w){
				if(field[j+i]=='username'){
					if(typeof filterID[w] == 'undefined'){
						filterID[w] = 1;
						if(w != '') str += field[j+1] + '[' + i + ']=' + w + '&';
					}
				}else{
					if(w != '') str += field[j+1] + '[' + i + ']=' + w + '&';
				}
			})
		}
	})
	str += '}';
	if(countObj(filterID)<line){
		var msg = 'Terdapat '+(line-countObj(filterID))+' data dengan username yang tidak unik';
		filterID = {}
		showAlert('',msg);
		$('#message-mass').html(msg)
		return false;
	}
	submission(str);
}
function duplicate(username){
	var msg = 'ID User '+username+' sudah ada di tabel';
	showAlert('',msg);
	$('#message-mass').html(msg)
}
function overKuota(response){
	var msg = 'Data yang diasukkan melebihi kuota';
	showAlert('',msg);
	msg += '<br>Kuota maksimum '+response.max+' Data kelebihan '+response.over;
	$('#message-mass').html(msg)
}
function successMass(){
	showAlert('', 'Data ditambahkan');
	$('#myModal').modal('hide');
	loadGrid();
}
