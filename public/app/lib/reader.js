function replaceImage(art) {
  art = art.replace(/src="image/g, 'src="' + domain + 'image');
  art = art.replace(/src=image/g, 'src="' + domain + 'image');
  art = art.replace(/src="\/image/g, 'src="' + domain + 'image');
  art = art.replace(/src=\/image/g, 'src=' + domain + 'image');
  return art;
}
function loadText(){
	showAlert('','Sedang Meminta data ke server ...')
	var localTarget = objTriger.attr('target').split('/');
	var localData = openStorage(localTarget[2]+'_'+localTarget[3]);
	var param = {};
	param.mtime = localData.mtime;
	sendRequest(reading, objTriger.attr('target'), param);
}
function reading(response){
  $('#tooltip').fadeOut();
	var localTarget = objTriger.attr('target').split('/');
		browse(response.data);
		saveStorage(response.data, localTarget[2]+'_'+localTarget[3],  response.mtime);
}
function browse(art){
	if(art!=''){
		art = replaceImage(art);
	}
	var objTarget = objTriger.attr('target').split('/');
	switch(objTriger.attr('type')){
		case 'btn-edit' : editor(art); break;
		case 'btn-read' : reader(art); break;
		default : $('#detil_'+objTarget[3]).html(art); break;
	}
}
function desktopEditor(){
	$('#dialog-body').css({'max-width':'800px'});
	CKEDITOR.plugins.addExternal( 'eqneditor', '/plugins/eqneditor/' );
	CKEDITOR.plugins.addExternal( 'videoembed', '/plugins/videoembed/' );
	CKEDITOR.plugins.addExternal( 'widgetselection', '/plugins/widgetselection/' );
	CKEDITOR.plugins.addExternal( 'lineutils', '/plugins/lineutils/' );
	CKEDITOR.plugins.addExternal( 'widget', '/plugins/widget/' );
	CKEDITOR.plugins.addExternal( 'justify', '/plugins/justify/' );
	CKEDITOR.plugins.addExternal( 'pastebase64', '/plugins/pastebase64/' );
	CKEDITOR.plugins.addExternal( 'popup', '/plugins/popup/' );
	CKEDITOR.plugins.addExternal( 'base64image', '/plugins/base64image/' );
	CKEDITOR.plugins.addExternal( 'symbol', '/plugins/symbol/' );
	CKEDITOR.plugins.addExternal( 'save', '/plugins/save/' );
	CKEDITOR.plugins.addExternal( 'allowsave', '/plugins/allowsave/' );
	CKEDITOR.plugins.addExternal( 'closebtn', '/plugins/closebtn/' );
  CKEDITOR.plugins.addExternal( 'html5video', '/plugins/html5video/' );
  CKEDITOR.plugins.addExternal( 'Audio', '/plugins/Audio/' );
  CKEDITOR.config.extraPlugins = 'eqneditor,popup,videoembed,symbol,widgetselection,lineutils,widget,pastebase64,base64image,save,allowsave,closebtn,html5video';
	CKEDITOR.config.removePlugins = 'image';
	CKEDITOR.config.toolbarCanCollapse=true;
	//CKEDITOR.config.contentsCss = '/fonts/myfonts.css';
	CKEDITOR.config.width = '100%';
	CKEDITOR.config.height = 400;
	CKEDITOR.config.resize_maxHeight = $('.modal-dialog').height();
	$('.modal-dialog').css({'background-color':'#fff'})
	CKEDITOR.config.font_names += ';Symbol;Wingding;Calisto;Calisto B;Calisto I;Calisto BI;Arabic';
	CKEDITOR.replace( 'editor',{
		toolbar: [
			{ name :'line_1', items : [ 'Save', 'closebtn', 'PasteFromWord', '-', 'Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll',
				     'TextColor', 'Bold', 'Italic', 'Strike', '-', 'Subscript', 'Superscript', 'RemoveFormat']}, '-', '-',
			{ name :'line_2', items : [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote',
	                 'Link', 'Unlink', '-', 'HorizontalRule', 'Symbol', 'base64image', 'Table', 'Iframe', '-', 'EqnEditor', 'VideoEmbed','Html5video']},'-', '-',
	        { name :'line_3', items : [ 'Preview', 'Source', 'Format', 'Font', 'FontSize', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock',
	                 'Maximize' ]}, '-',
		],
	});
}
function mobileEditor(){
	$('#dialog-body').css({'max-width':'90%'});
	CKEDITOR.plugins.addExternal( 'videoembed', '/plugins/videoembed/' );
	CKEDITOR.plugins.addExternal( 'widgetselection', '/plugins/widgetselection/' );
	CKEDITOR.plugins.addExternal( 'lineutils', '/plugins/lineutils/' );
	CKEDITOR.plugins.addExternal( 'widget', '/plugins/widget/' );
	CKEDITOR.plugins.addExternal( 'justify', '/plugins/justify/' );
	CKEDITOR.plugins.addExternal( 'popup', '/plugins/popup/' );
	CKEDITOR.plugins.addExternal( 'base64image', '/plugins/base64image/' );
	CKEDITOR.plugins.addExternal( 'symbol', '/plugins/symbol/' );
	CKEDITOR.plugins.addExternal( 'save', '/plugins/save/' );
	CKEDITOR.plugins.addExternal( 'allowsave', '/plugins/allowsave/' );
	CKEDITOR.plugins.addExternal( 'closebtn', '/plugins/closebtn/' );
  CKEDITOR.plugins.addExternal( 'html5video', '/plugins/html5video/' );
  CKEDITOR.plugins.addExternal( 'Audio', '/plugins/Audio/' );
  CKEDITOR.config.extraPlugins = 'popup,videoembed,symbol,widgetselection,lineutils,widget,base64image,save,allowsave,closebtn,html5video';
	CKEDITOR.config.removePlugins = 'image';
	//CKEDITOR.config.contentsCss = '/fonts/myfonts.css';
	CKEDITOR.config.width = '100%';
	CKEDITOR.config.toolbarCanCollapse=true;
	CKEDITOR.config.height = 300;
	CKEDITOR.config.resize_maxHeight = $('.modal-dialog').height();
	$('.modal-dialog').css({'background-color':'#fff'})
	CKEDITOR.config.font_names += ';Symbol;Wingding;Calisto;Calisto B;Calisto I;Calisto BI;Arabic';
	CKEDITOR.replace( 'editor',{
		toolbar: [
			{ name :'line_1', items : [ 'Save', 'closebtn', 'Undo', 'Redo', 'SelectAll',
				     'Bold', 'Italic', '-', 'Subscript', 'Superscript', 'NumberedList',
				     'BulletedList', 'Outdent', 'Indent', 'Link', 'Unlink', '-', 'HorizontalRule',
				     'Symbol', 'base64image', 'Table', 'Iframe', '-', 'VideoEmbed','Html5video','Source', 'Format',
				      'Font', 'FontSize', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight',
				      'JustifyBlock']},
		],
	});
}
function editor(txt){
	modalView();
	$('#dialog-body').html('<textarea id="editor" target="'+objTriger.attr('target')+'">'+txt+'</textarea>');
	if($(window).width()<600 || $(window).height()<600){
		mobileEditor();
	}else{
		desktopEditor();
	}
}
function reader(txt){
	if(txt==''){
		showAlert('','Bacaan belum tersedia');
		return false;
	}
	modalView();
	$('#dialog-body').html('<article style="max-width:720px;margin:auto;background-color:#fff;padding:10px 10px 10px 10px">'+txt+'</article>').show();
	$('#dialog-body').prepend('<div class="col"><h4 class="pull-right"><a href="#" class="btn btn-default" type="btn-close"><span class="fa fa-close"></span></a></h4></div>');
	$('#dialog-body').css({'max-width':'720px'})
	$('article').readmore();
}
function saving(response){
	var txt = CKEDITOR.instances.editor.getData();
	var j=0;
	$.each($(txt).find('img'), function(i, v){
		if(v.src.search(/^data:image\/(png|jpg|jpeg|gif);base64,([^`]*?)$/gm)>-1){
			var feed = v.src.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/gm, '');
			txt = txt.replace(v.src, domain+'image/read/'+md5(feed)+'.png');
			j++;
		}
	})
	if(j>0){
		CKEDITOR.instances.editor.setData(txt);
	}
	var storage = $('#editor').attr('target').split('/');
	saveStorage(txt, storage[2]+'_'+storage[3], response.mtime);
	$('#detil_'+storage[3]).html(txt);
	showAlert('success','Data telah diperbarui.');
}
function saveEditor(){
	var storage = $('#editor').attr('target').split('/');
	var param = {};
	param.text = CKEDITOR.instances.editor.getData();
	var maxSize = 1048576;
	if(param.text.length>maxSize){
		showAlert('warning','Data terlalu besar');
		var tg = new Date();
		saveStorage(param.text, storage[2]+'_'+storage[3], tg.getTime())
		saveProcess = false;
	}else{
		saveProcess = true;
		param.atribut = analize(param.text);
		par = $('#editor').html().split("\r");
		objTriger.attr('disabled',true);
		sendRequest(saving, $('#editor').attr('target').replace('read','write'), param);
	}
}
function analize(txt){
	var output = {};
	var paragraphs = {};
	var figures={};
	var tables = {};
	var iframes = {};
	f=0;
	p=0;
	t=0;
	i=0;
	$.each($.parseHTML(txt), function(j,v){
		if(v.nodeName=='P' || v.nodeName=='DIV'){
			var sentences = v.innerHTML.split(/[.!?][ ]/);
			var s=0;
			$.each(sentences, function(k,w){
				var words = w.split(' ');
				if(words.length > 2 && w.charAt(0) == w.charAt(0).toUpperCase()){
					s++;
				}
			})
			if(s>2){
				paragraphs[p] = '<p>'+v.innerHTML+'</p>';
				p++;
			}
		}
	})
	var img = 0;
	$.each($(txt).find("img"), function(i, v){
		if($(v).attr('src') != ''){
			img++;
		}
	})
	var table = 0;
	$.each($(txt).find("table"), function(i, v){
		//console.log($(v))
	})
	output['paragraf'] = countObj(paragraphs);
	output['figure'] = img;
	return output;
}
//var readerLib = true;
