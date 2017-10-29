var d = new Date();
var year = d.getFullYear();
var month = d.getMonth();
var day = d.getDate();
var today = new Date();
var now = new Date();
var minDate = new Date(year, month-3, day)
var maxDate = new Date(year, month+6, day)
var panelSearch;
var panelButton;
var tableHead;
var tableBody;
var panelNav;
function dateFormal(data){
	var year = data.getFullYear();
	var month = data.getMonth();
	var day = data.getDate();
	return year+'-'+('0'+month).substr(-2,2)+'-'+('0'+day).substr(-2,2);
}
function dateTimeFormal(data){
	var year = data.getFullYear();
	var month = data.getMonth();
	var day = data.getDate();
	var hour = d.getHours();
	var minute = d.getMinutes();
	return year+'-'+('0'+month).substr(-2,2)+'-'+('0'+day).substr(-2,2)+'T'+('0'+hour).substr(-2,2)+':'+('0'+minute).substr(-2,2);
}
function dateNonFormal(data){
	var year = data.getFullYear();
	var month = data.getMonth();
	var day = data.getDate();
	return day+'-'+month+'-'+year;	
}
minDateFormal = dateFormal(minDate);
maxDateFormal = dateFormal(maxDate);
today = dateFormal(today);
now = dateTimeFormal(now);
var message ='Waktu bisa diset dari tanggal '+dateNonFormal(minDate)+' hingga '+dateNonFormal(maxDate);
var items = [];
var order = 0;
var urlquiz;
function clearPage(){
	$('#sidebar').html('');
	$('#menubar').html('');
	$('#switch').html('');
}
function addItem(){
	param[$('.select-multiple').attr('name')] = $('.select-multiple').val();
	data = param;
	method = $('#table').attr('target').replace(/grid/,'add');
	sendRequest(adding); 
}
function download(){
	renderDoc();
	var xlsName='test';
 	$("#screen").table2excel({
       name: "Excel Document Name",
		filename: xlsName,
		exclude_img: true,
		exclude_links: true,
		exclude_inputs: true
	});
	$('#screen').html('');
}
function renderDoc(){
	var data = maskData();
	var txt = '<table><thead><tr><th colspan="'+data.body[0].length+'">'+data.title.main.text+'</th></tr>';
	txt += '<tr><th colspan="'+data.body[0].length+'">'+data.title.second.text+'</th></tr><tr><td></td></tr></thead><thead>';
	$.each(data.body, function(i,v){
		txt += '<tr>';
		$.each(v, function(j, w){
			if(i<data.config.rowhead){
				if(typeof w.text != 'undefined'){
					txt += '<th ';
					if(typeof w.colSpan != 'undefined'){
						txt += 'colspan="'+w.colSpan+'"';
					}
					if(typeof w.rowSpan != 'undefined'){
						txt += 'rowspan="'+w.rowSpan+'"';
					}
					txt += '>'+w.text+'</th>';
				} 
			}else{
				txt += '<td>'+(typeof w.text != 'undefined' ? w.text : '')+'</td>';
			}
		})
		txt += '</tr>';
		if(data.config.rowhead-1==i){
			txt += '</thead><tbody>';
		}
	})
	txt += '</tbody></table>';
	$('#screen').html(txt);
}
function cKeyUp(e){
	if(altDown){
		modalHide();
	}
}
function resultAssessment(response){
	showAlert('','Data telah disimpan');
	$('#btn-opt-'+current).removeClass('btn-info').addClass('btn-success');
}
function importing(){
	$('#myModal').modal('show');
	$('#dialog-body').html()
	$('#text-body').hide()
}