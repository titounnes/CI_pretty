var conf = openStorage('quizConfig');
var qt = openStorage('quizQuestion');
var d1 = new Date();
var config;
var question;
var current;
var runTest = false;
var tester;
var dataItem = {}
var quizCheck = {};
var countdown;
var countdownWait;
var finishTime = 0;
var startTest;
function shuffle(obj) {
    return obj.sort(function(a, b){return 0.5 - Math.random()});
}
function replaceImage(art) {
  art = art.replace(/src="image/g, 'src="' + domain + 'image');
  art = art.replace(/src=image/g, 'src="' + domain + 'image');
  art = art.replace(/src="\/image/g, 'src="' + domain + 'image');
  art = art.replace(/src=\/image/g, 'src=' + domain + 'image');
  return art;
}
function renderQuiz(obj){
	if(runTest==false) return false;
	$('#list-option').html('');
	$('#question-text').html('');
	$(obj).each(function(i, v){
		if(v.nodeName == 'OL'){
			k=1;
			var opt = [];
			$($.parseHTML($(v).html())).each(function(j, w){
				if(w.nodeName == 'LI')
				{
					opt[k-1] = '<div class="hanging-indent opt-list" style="background-color:'+(k == question[current].answer?'#c0c0c0':'#fff')+'">';
					opt[k-1] += '<input type="radio" '+(k == question[current].answer ? 'checked':'')+' target="'+k+'" class="option-answer" name="option" value="'+(k)+'">';
					opt[k-1] += '***. '+$(w).html()+'</div>';
					k++;
				}
			});
			if(config.random==0){
				opt = shuffle(opt);
			}
			$('#list-option').html('');
			for(j=0;j<opt.length;j++){
				$('#list-option').append(opt[j].replace('***',String.fromCharCode(65+j)).replace(/<p>/,'').replace(/<\/p>/,''));
			}
		}else{
			if(typeof $(v).html() != 'undefined')
			{
				$('#question-text').append('<p>'+$(v).html()+'</p>');
			}
		}
	})
}
function renderItem(response){
  setSession(response);
	dataItem[current] = replaceImage(response.data);
	renderQuiz(dataItem[current]);
}
function showQuestion(){
	$('#splashTest').hide();
	$('.btn-nav').show();
	$('.btn').attr('disabled',false);
	$('#nav-'+current).attr('disabled',true);
	if(current==0){
		$('#prev').hide();
	}
	if(current==question.length-1){
		$('#next').hide();
	}
	$('#question-text').html('Sedang mengambil soal....');
	$('#question-number').html(current*1+1);
	$('#question-total').html(question.length);
	$('#list-option').html('');
	if(question[current].status==0){
		$('#btn-sure').removeClass('btn-success').addClass('btn-warning').show()
		$('#text-sure').html('<span class="minimize">Saya </span>Yakin')
	}else{
		$('#btn-sure').addClass('btn-success').removeClass('btn-warning').show()
		$('#text-sure').html('<span class="minimize">Saya </span>Ragu')
	}
	var option= '';
	if(current<question.length || current>=0){
		if(typeof dataItem[current]=='undefined'){
      sendRequest(renderItem,tester+'/read/quiz_run/'+question[current].id);
		}else{
			renderQuiz(dataItem[current]);
		}
	}
}
function navQuiz(){
	var btn = '<a href="#" id="prev" class="btn btn-info btn-lg btn-nav" type="btn-nav" target="prev" style="display:none"><span class="fa fa-angle-left"></span></a>';
	btn += '<a href="#" id="btn-sure" class="btn btn-'+(question[current].status==1?'success':'warning')+' btn-lg" type="btn-sure" target="sure"><span id="text-sure"><span class="minimize">Saya </span>'+(question[current].status==1?'Ragu':'Yakin')+'</span> <span class="fa fa-check"></span></a>';
	btn += '<a href="#" id="next" class="btn btn-info btn-lg btn-nav" type="btn-nav" target="next"><span class="fa fa-angle-right"></span></a>';
	$('#buttonbar').html(btn);
	if(tester=='teacher'){
		btn = '<a href="#" class="btn btn-danger btn-lg" type="close-quiz"><span class="fa fa-close"></span></a>';
		$('#buttonbar').append(btn);
	}
	if(config.navigation==0){
		$('#text-sure').hide();
	}else{
		$('#text-sure').show();
	}
}
function finishTest(){
	var splash = '<h2 class="text-center">Maaf... Jatah waktu anda telah habis</h2>'+
		'<div style="margin:auto" class="text-center">'+
		'<a href="#" class="btn btn-lg btn-close btn-danger" type="close-quiz">OK <span class="fa fa-close"></span></a></div>';
	$('#splashTest').show().html(splash);
	setTimeout(function(){ closeQuiz()},3000);
}
function showCountDown(){
	if(config.remain*1<10){
		finishTest();
		return false;
	}
	if(config.countdown>600){
		var rem = config.countdown > 86400 ? Math.floor(config.countdown/86400)+' hari' : (config.countdown>3600 ? Math.floor(config.countdown/3600)+' jam' : Math.floor(config.countdown/60)+' menit');
		var splash = '<h2 class="text-center">Test baru akan dilaksanakan '+rem+' dari sekarang</h2><br>'+
				'<h1 class="text-center">Terima kasih</h1>';
		$('#splashTest').show().html(splash);
		setTimeout(function(){ closeQuiz()},3000);
		return false;
	}
	var currentTime = new Date();
	startTest = currentTime.getTime()/1000+config.countdown*1;
	var splash = '<h2 class="text-center">Test segera dimulai dalam<br>'+
		'<span id="cd-m"></span>: <span id="cd-d"></span></h2>'+
		'<h1 class="text-center">Persiapkan Diri Anda</h1>'+
		'<div style="margin:auto" class="text-center">'+
		'<a href="#" class="btn btn-lg btn-danger btn-close" type="close-quiz">Batal <span class="fa fa-close">'+
		'</span></a></div>';
	$('#splashTest').show().html(splash);
	countdownWait = setInterval(showTimerWait,1000);
}
function showQuiz(response){
  setSession(response);
	question = response.quizItem;
	config = response.dataTest;
	$('#page').hide();
	if(config.countdown>0){
		showCountDown();
	}else{
		finishTest();
	}
}
function quiz(){
  var target = objTriger.attr('target').split('/');
  console.log($(window).width())
  if($(window).width()<600 || $(window).height()<600){
    console.log($('#question').attr('style'))
    $('#question').attr('style','');
    $('#option').attr('style','');
  }
	tester = target[0];
	sendRequest(showQuiz,objTriger.attr('target'));
}
function inputToken(){
	pretest = true;
	var splash = '<h2 class="text-center">Klik OK Jika Anda Telah Siap</h2>'+
		'<div style="margin:auto" class="text-center"><input type="'+(config.token_required==0?'hidden':'text')+'" id="token" value="'+(config.token_required==0?config.token:''

			)+'" class="form-control text-center" text-type="text-token"></div>'+
		'<div style="margin:auto" class="text-center"><a href="#" class="btn btn-primary btn-lg" type="btn-ok">OK <span class="fa fa-check"></span></a>'+
		'<a href="#" class="btn btn-primary btn-lg btn-close" type="close-quiz">Batal <span class="fa fa-close"></span></a></div>'+
		'<div style="margin:auto;font-size:24px" class="text-center" id="message-token"></div>';
	$('#splashTest').show().html(splash);
}
function cekToken(){
	if($('#token').val() != config.token){
		$('#message-token').html('Token yang anda masukan salah. Silahkan coba lagi..')
	}else{
		$('#splashTest').hide();
		teststart();
	}
}
function runTimer(response){
	setSession(response);
	if(finishTime == 0){
		currentTime = new Date();
		finishTime = currentTime.getTime()/1000+response.remain*1;
	}
}
function teststart(){
	runTest = true;
	current=0;
	if(tester=='student'){
		saveStorage(config, 'quizConfig');
		saveStorage(question, 'quizQuestion');
	}
	data = '';
	method = config.timer;
	sendRequest(runTimer,tester+'/timer/quiz_run/');
	$('#hint').html('Untuk menjawab, anda hanya perlu mengklik salah satu jawaban');
	$('#myTest').show();
	$('#page').hide();
	var btn = '';
	if(config.navigation==1){
		$.each(question, function(i, v){
			btn += (i%5==0) ? '<div>' : '';
			btn += '<a href="#" id="nav-'+i+'" class="btn btn-lg btn-'+(v.answer==null?'info':(v.status==1?'success':'warning'))+'" type="btn-number" target="'+i+'">'+(i+1)+' <span id="quiz-'+i+'"></span></a>';
			btn += (i%5==4) ? '</div>' : '';
		})
		$('#navigation').html(btn).show();
		if($(window).width()<600 || $(window).height()<600){
			$('#navigation').css({'width':'100%','left':'0'});
			$('#question').css({'width':'100%','left':'0'})
			$('#option').css({'width':'100%','left':'0%'})
		}else{
			$('#navigation').css({'width':'30%','left':'70%'});
			$('#question').css({'width':'40%'})
			$('#option').css({'width':'30%','left':'40%'})
		}
	}else{
		$('#navigation').hide();
		if($(window).width()<600 || $(window).height()<600){
			$('#option').css({'width':'100%','left':'0%'})
			$('#option').css({'width':'100%','left':'0%'})
		}else{
			$('#question').css({'width':'50%'})
			$('#option').css({'width':'50%','left':'50%'})
		}

	}
	$('#secondTest').html(' ');
	$('#minuteTest').html(' ');
	$('#hourTest').html(' ');
	if(config.navigation==1){
		if(question[current].answer>0){
			gotoNext();
		}else{
			showQuestion();
		}
	}
	countdown = setInterval(showTimer,1000);
	navQuiz();
	if(tester=='student'){
		$('#close').hide();
	}else{
		$('#close').show();
	}
}
function gotoPrev(obj){
	if(current>0){
		current--;
		if(typeof question[current].answer == 'undefined'){
			return false;
		}
		if(question[current].answer>0){
			gotoPrev(obj)
			return false;
		}
		showQuestion();
	}
}
function gotoNext(obj){
	if(current<countObj(question)){
		current++;
		if(typeof question[current].answer == 'undefined'){
			return false;
		}
		if(question[current].answer>0){
			gotoNext(obj)
			return false;
		}
		showQuestion();
	}
}
function closeTest(){
	runTest = false;
	clearInterval(countdownWait);
	$('#question-text').html('');
	$('#list-option').html('');
	$('#navigation').html('');
	$('#buttonbar').html('');
	$('#myTest').hide();
	$('#splashTest').show().html('<h2 class="text-center">Waktu Sudah Habis</h2><h3 class="text-center">Terima Kasih</h3><div style="margin:auto" class="text-center"><a href="#" class="btn btn-lg btn-danger btn-close" type="close-quiz"><span class="fa fa-close"></span></a></div>')
	question = {};
	finishTime = 0;
}
function showTimerWait(){
	currentTime = new Date();
	var h = Math.floor((startTest - currentTime.getTime()/1000)/3600);
	var rh = (startTest - currentTime.getTime()/1000) % 3600;
	var m = Math.floor(rh/60);
	var s = Math.round(rh % 60);
	if(h<0){
		clearInterval(countdownWait);
		inputToken();
	}else{
		$('#cd-d').html(s<10?'0'+s:s);
		$('#cd-m').html(m<10?'0'+m:m);
		$('#cd-h').html(h<10?'0'+h:h);
	}
}
function showTimer(){
	currentTime = new Date();
	var h = Math.floor((finishTime - currentTime.getTime()/1000)/3600);
	var rh = (finishTime - currentTime.getTime()/1000) % 3600;
	var m = Math.floor(rh/60);
	var s = Math.round(rh % 60);
	if (s % 15 == 14){
		sendRequest(runTimer,tester+'/timer/quiz_run');
	}
	if(h<0){
		clearInterval(countdown);
		$('#secondTest').html('00');
		closeTest();
	}else{
		$('#secondTest').html(s<10?'0'+s:s);
		$('#minuteTest').html(m<10?'0'+m:m);
		$('#hourTest').html(h<10?'0'+h:h);
	}
}
function signing(){
	quizCheck.answer= question[current].answer;
	quizCheck.status= question[current].status==0 ? 1 : 0;
	quizCheck.instrument_id=question[current].id;
	sendRequest(sendAnswer,tester+'/answer/quiz_run',quizCheck);
}
function sendAnswer(response){
	setSession(response);
	$('#nav-'+current).removeClass('btn-info').addClass('btn-success');
	question[current].answer=quizCheck.answer;
	question[current].status=quizCheck.status;
	$('.opt-list p').css({'background-color':'#fff'});
	$(this).parent().css({'background-color':'#ccc'})
	if(quizCheck.status>0){
		$('#nav-'+current).removeClass('btn-warning').addClass('btn-success');
		$('#btn-sure').addClass('btn-success').removeClass('btn-warning').show()
		$('#text-sure').html('<span class="minimize">Saya </span>Ragu')
	}else{
		$('#nav-'+current).removeClass('btn-success').addClass('btn-warning');
		$('#btn-sure').removeClass('btn-success').addClass('btn-warning').show()
		$('#text-sure').html('<span class="minimize">Saya </span>Yakin')
	}
}
function answer(obj){
	quizCheck.answer= obj.val();
	quizCheck.status=1;
	quizCheck.instrument_id=question[current].id;
	sendRequest(sendAnswer,tester+'/answer/quiz_run',quizCheck);
}
function closeQuiz(){
	clearInterval(countdown);
	clearInterval(countdownWait);
	$('#page').show();
	$('#myTest').hide();
	$('#splashTest').hide();
}
//var quizLib = true;
