var runAssessment;
var current;
var assessmentType;
var assessor;
var segment;
var targetPost;
option[5] = 'Memenuhi kriteria lebih dari 80-100%';
option[4] = 'Memenuhi kriteria lebih dari 60-80%';
option[3] = 'Memenuhi kriteria lebih dari 40-60%';
option[2] = 'Memenuhi kriteria lebih dari 20-40%';
option[1] = 'Memenuhi kriteria lebih dari 0-20%';
dataItem = {};
function replaceImage(art) {
  art = art.replace(/src="image/g, 'src="' + domain + 'image');
  art = art.replace(/src=image/g, 'src="' + domain + 'image');
  art = art.replace(/src="\/image/g, 'src="' + domain + 'image');
  art = art.replace(/src=\/image/g, 'src=' + domain + 'image');
  return art;
}
function assessment(){
	segment = objTriger.attr('target').split('/');
	assessor = segment[0];
	var typeOfAss = segment[2].split('_');
	assessmentType = typeOfAss[0];
	runAssessment = true;
	sendRequest(openAssessment, objTriger.attr('target'));
}
function openAssessment(response){
	setSession(response)
	var btn = '';
	var opt = '';
	if(assessmentType=='performance'){
		$('#viewSubject').html('<img width="200px" class="profile profile-big"src="'+domain+'image/profile/'+segment[3]+'.png"/>')
	}else{
		sendRequest(showProdduct, objTriger.attr('target').replace(/assessment/,'read').replace(/instrument/,'product'));
	}
	if(typeof response.items=='undefined'){
		btn = 'Instrumen penilaian belum tersedia';
	}else{
		if(countObj(response.items)>0){
			$(response.items).each(function(i, v){
				btn += '<a href="#" id="btn-opt-'+i+'" class="btn btn-'+(v.score==null?'info':'success')+'" type="btn-option" target="'+i+'">'+(i+1)+'</a>';
			})
			instrument = response.items;
			targetPost = assessor+'/replace/'+assessmentType+'_assessment/';
			current = 0;

			for(i=5;i>0;i--){
				opt += '<p><input type="radio" name="option" class="radio-option" id="opt_'+i+'" target="'+i+'" '+(response.items[0].score==i ? 'checked' : '')+'>'+option[i]+'</p>';
			}
			$('#viewRubric').html(opt);
			viewItems();
			$('#panelInstrumentReview').html(btn)
		}else{

		}
	}
	$('#page').hide();
	$('#sheetAssessment').show();
}
function showProdduct(response){
	if(response.data!=''){
		$('#viewSubject').html(replaceImage(response.data));
	}else{
		$('#viewSubject').html('Produk Belum dibuat');
	}
	$('#viewSubject').prepend('<h3>Laporan Produk</h3>')
}
function viewItems(){
	showItem();
	$('.radio-option').prop('checked',false);
	$('#comment').val(instrument[current].comment);
	if(instrument[current].score != null){
		$('#opt_'+instrument[current].score).prop('checked',true);
	}
}
function showItem(){
	obj = openStorage(assessmentType+'Instrument_'+instrument[current].id);
	var method = assessor + '/read/'+assessmentType+'_instrument/'+instrument[current].id;
	if(typeof(obj.data)=='undefined'){
		$('#viewInstrument').html('<h3><b>'+instrument[current].aspect+'</b></h3>');
		if(typeof dataItem[current] == 'undefined'){
      console.log(method)
			sendRequest(showRubric, method);
		}else{
			$('#viewInstrument').append(dataItem[current])
		}
	}else{
		$('#viewInstrument').html(obj.data)
	}
}
function showRubric(response){
	if(response.mtime==0){
		$('#viewInstrument').append('Rubrik penilaian belum dideskripsikan');
		$('.rubric').hide();
	}else{
		$('.rubric').show();
		dataItem[current] = replaceImage(response.data);
		$('#viewInstrument').append(dataItem[current])
	}
}
function sendAssessment(obj){
	instrument[current].comment = $('#comment').val();
	instrument[current].score = obj.attr('target');
	instrument[current].instrument_id = instrument[current].id
	sendRequest(resultAssessment, targetPost, instrument[current]);
}
function resultAssessment(response){
	$('#btn-opt-'+current).removeClass('btn-info').addClass('btn-success');
}
function closeAssessment(){
	runAssessment = false;
	$('#page').show();
	if($('.select-primary').length > 0){
		$('.select-primary').change();
	}else{
		loadGrid();
	}
	$('#sheetAssessment').hide();
	$('.onReview').html('');
}
