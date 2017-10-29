/*var inputHTML = class {
	constructor(type, obj, id) {
		this.type = type;
		this.obj = obj;
		this.id = id;
		this.html = '';
	}
	render() {
		switch{
			case 'select' :
				this.html += '<select name="'+this.obj.field+(typeof this.id == 'undefined' ? ''+ '['+this.id+']')+'" class="form-control form-cell';
				if(typeof this.obj.option.source == 'object'){
					this.html += '">';
					$.each(this.obj.option.source, function(i, v){
						var selected = (i == this.obj.data) ? ' selected':'';
						out += '<option value="'+i+'"'+selected+'>'+v+'</option>';
					})
				}else{
					this.html += ' select-grid" target="'+this.obj.target+'/'+this.id+'" ';
					if(typeof this.id == 'undefined' || this.id == ''){
						this.html += this.obj.validation+' data-validation-error-msg-container="#'+this.obj.field+'-error-dialog">';
					}else{
						this.html += '>';
					}
					if(this.obj.data !=null  && this.obj.data != '' && this.obj.data != 0){
						this.html += '<option value="'+this.obj.data+'" selected>'+this.obj.selectedLabel+'</option>';
					}else{
						this.html += '<option value="">Pilih Salah Satu</option>';
					}
				}
				this.html += '</select>';
				if(typeof this.id == 'undefined' || this.id == ''){
					this.html = inputAddon(this.html, this.obj.icon) +'<div id="'+this.obj.field+'-error-dialog"></div>';
				}
				break;
		}
		return this.html;
	}
};
*/
function cellSelect(param, j){
	if(typeof j == 'undefined' || j == ''){
		var out = '<select name="'+param.field+'" class="form-control form-cell';
	}else{
		var out = '<select name="'+param.field+'['+j+']'+'"  class="form-control form-cell';
	}
	if(typeof(param.option.source) == 'object'){
		out += '">';
		$.each(param.option.source, function(i, v){
			var selected = i==param.data ? ' selected':'';
			out += '<option value="'+i+'"'+selected+'>'+v+'</option>';
		})
	}else{
		out += ' select-grid" target="'+param.option.target+'/'+j+'" ';
		if(typeof j == 'undefined' || j == ''){
			out += param.validation+' data-validation-error-msg-container="#'+param.field+'-error-dialog">';
		}else{
			out += '>';
		}
		if(param.data !=null  && param.data != '' && param.data != 0){
			out += '<option value="'+param.data+'" selected>'+param.selectedLabel+'</option>';
		}else{
			out += '<option value="">Pilih Salah Satu</option>';
		}
	}
	out += '</select>';
	if(typeof j == 'undefined' || j == ''){
		return inputAddon(out, param.icon) +'<div id="'+param.field+'-error-dialog"></div>';
	}
	return out;
}
function cellHidden(param){
	return '<input name="'+param.field+'" type="hidden" value="'+param.data+'">';
}
function cellCell(param, j){
	return param.data == null ? '' : param.data;
}
function cellTd(param, j){
	return param.data == null ? '' : param.data;
}
function cellText(param,j){
	if(typeof j == 'undefined' || j == ''){
		var el = inputAddon('<input name="'+param.field+'" '+(param.readonly==true?'ReadOnly':'')+' class="form-control form-cell" placeholder="'+param.label+'" type="text" value="'+(param.data==null?'':param.data)+'" '+param.validation+' data-validation-error-msg-container="#'+param.field+'-error-dialog" data-validation-error-msg="'+param.err+'">', param.icon);
		el +='<div id="'+param.field+'-error-dialog"></div>';
		return el;
	}
	return '<input name="'+param.field+'['+j+']'+'" '+(param.field=='mean'?'ReadOnly':'')+' class="form-control form-cell" placeholder="'+param.field+'" type="text" value="'+(param.data==null?'':param.data)+'">';
}
function cellNumber(param,j){
	if(typeof param.max != 'undefined' && typeof param.min != 'undefined'){
		var step = Math.round((param.max-param.min)/10);
	}else{
		var step = 10;
	}
	if(typeof j == 'undefined' || j == ''){
		var el = inputAddon('<input name="'+param.field+'" step ="'+step+'" max="'+param.max+'" min="'+param.min+'" class="form-control form-cell" placeholder="'+param.label+'" type="text" value="'+param.data+'" '+param.validation+' data-validation-error-msg-container="#'+param.field+'-error-dialog" data-validation-error-msg="'+param.err+'">', param.icon);
		el +='<div id="'+param.field+'-error-dialog"></div>';
		return el;
	}
	return '<input name="'+param.field+'['+j+']'+'" step ="'+step+'" max="'+(typeof param.max != 'undefined' ? param.max : '')+'" min="'+(typeof param.min != 'undefined' ? param.min : '')+'" '+(typeof param.readonly!='undefined' ?'ReadOnly ':' ')+(typeof param.mean != 'undefined' ? 'mean="true"' : '')+' class="form-control form-cell number" row="'+j+'" type="text" value="'+(param.data != null ? param.data : 0)+'">';
}
function cellEmail(param,j){
	if(typeof j == 'undefined' || j == ''){
		var el = inputAddon('<input name="'+param.field+'" '+(param.readonly==true?'ReadOnly':'')+' class="form-control form-cell" placeholder="'+param.label+'" type="email" value="'+(typeof param.data == 'undefined' ? '' : param.data)+'" '+param.validation+' data-validation-error-msg-container="#'+param.field+'-error-dialog" data-validation-error-msg="'+param.err+'">', param.icon);
		el +='<div id="'+param.field+'-error-dialog"></div>';
		return el;
	}
	return '<input name="'+param.field+'['+j+']'+'" '+(param.readonly==true?'ReadOnly':'')+' class="form-control form-cell" placeholder="'+param.label+'" type="email" value="'+param.data+'">';
}
function cellPassword(param,j){
	if(typeof j == 'undefined' || j == ''){
		var el = inputAddon('<input name="'+param.field+'"  maxlength="20" minlength="6" class="form-control form-cell" required placeholder="'+param.label+'" type="password" value="'+(typeof param.data == 'undefined' ? '' : param.data)+'">', param.icon);
		el +='<div id="'+param.field+'-error-dialog"></div>';
		return el;
	}
	return '<input name="'+param.field+'['+j+']'+'" placeholder="Kosongkan bila tidak akan diubah" class="form-control form-cell" placeholder="'+param.label+'" type="password" value="'+param.data+'">';
}
function cellDate(param,j){
	if(typeof j == 'undefined' || j == ''){
		var el = inputAddon('<input name="'+param.field+'" class="form-control form-cell" placeholder="'+param.label+'" type="date" value="'+param.data+'" '+param.validation+' data-validation-error-msg-container="#'+param.field+'-error-dialog"data-validation-error-msg="'+param.err+'">', param.icon);
		el +='<div id="'+param.field+'-error-dialog"></div>';
		return el;
	}
	return '<input name="'+param.field+'['+j+']'+'" '+(param.readonly==true?'ReadOnly':'')+' class="form-control form-cell" type="date" value="'+param.data+'">';
}
function cellDatetime(param,j){
	if(typeof j == 'undefined' || j == ''){
		var el = inputAddon('<input name="'+param.field+'" class="form-control form-cell" placeholder="'+param.label+'" type="datetime-local" value="'+param.data+'" '+param.validation+' data-validation-error-msg-container="#'+param.field+'-error-dialog" data-validation-error-msg="'+param.err+'">', param.icon);
		el +='<div id="'+param.field+'-error-dialog"></div>';
		return el;
	}
	return '<input name="'+param.field+'['+j+']'+'" '+(param.readonly==true?'ReadOnly':'')+' class="form-control form-cell" type="datetime-local" value="'+(param.data != 'undefined' ? param.data.replace(' ','T'):'')+'">';
}
function cellDateTime(param,j){
	if(typeof j == 'undefined' || j == ''){
		var el = inputAddon('<input name="'+param.field+'" class="form-control form-cell" placeholder="'+param.label+'" type="datetime-local" value="'+param.data+'" '+param.validation+' data-validation-error-msg-container="#'+param.field+'-error-dialog" data-validation-error-msg="'+param.err+'">', param.icon);
		el +='<div id="'+param.field+'-error-dialog"></div>';
		return el;
	}
	return '<input name="'+param.field+'['+j+']'+'" '+(param.readonly==true?'ReadOnly':'')+' class="form-control form-cell" type="datetime-local" value="'+(param.data != 'undefined' ? param.data.replace(' ','T'):'')+'">';
}
function cellTextarea(param, j){
	if(typeof j == 'undefined' || j == ''){
		var el = inputAddon('<textarea name="'+param.field+'" class="form-control form-cell" '+param.validation+' data-validation-error-msg-container="#'+param.field+'-error-dialog" data-validation-error-msg="'+param.err+'">'+(typeof param.data == 'undefined' ? '' : param.data)+'</textarea>');
		el +='<div id="'+param.field+'-error-dialog"></div>';
		return el;
	}
	return '<textarea name="'+param.field+'['+j+']'+'" '+(param.readonly==true?'ReadOnly':'')+' class="form-control form-cell">'+(param.data==null?'':param.data)+'</textarea>';
}
function cellLabel(param, j){
	return '<textarea class="form-control" readOnly>'+param.data+'</textarea>';
}
function cellButton(param, action){
	return '<a href="#" target="'+param.target+(typeof action =='undefined' ? '' : action)+'" class="'+param.class+'" type="'+param.type+'" id="'+param.type+'" data="'+param.value+'">'+(typeof param.label == 'undefined' ? '' : param.label)+' <span class="'+param.icon+'"></span></a>';
}
function cellRadio(param, j){
	return '<input type="radio" checked="'+(param.value==param.data)+'" class="form-control" name="'+param.name+(typeof j == 'undefined' ? '' : '['+j+']')+'" value="'+param.value+'">';
}
function cellReadonly(param){
	return '<input  class="form-control" type="text" readOnly value="'+param.data+'">';
}
function cellSpan(param){
	return '<div class="preview">'+param.data+'</div>';
}
function cellList(param){
	data = (param.data== '-' || param.data=='' || param.data==null)? 'Data tidak tersedia' : '<ol><li>'+param.data+'</ol>';
	return '<div  class="preview">'+data+'</div>';
}
function cellInfo(param){
	return '<div  class="preview">'+param.data+'</div>';
}
