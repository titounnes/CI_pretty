function replaceImage(art) {
  art = art.replace(/src="image/g, 'src="' + domain + 'image');
  art = art.replace(/src=image/g, 'src="' + domain + 'image');
  art = art.replace(/src="\/image/g, 'src="' + domain + 'image');
  art = art.replace(/src=\/image/g, 'src=' + domain + 'image');
  return art;
}
function printPreview() {
  var newWin = window.frames["uploadFrame"];
  newWin.document.write('<body onload="window.print()">' + header + $('#quiz-preview').html() + '</body>');
  newWin.document.close();
}

function previewQuiz(response) {
  var percent = 100 * (Math.round((order + 1) / items.length)) + '%';
  $('.progress-bar').html('Proses ' + percent).css({
    'width': percent
  })
  response.data = replaceImage(response.data);
  $('#quiz').append('<li>' + response.data.replace(/<ol>/, '<ol start="1" style="list-style-type:upper-alpha">') + '<br></li>');
  order++;
  parsingQuiz(order)
}

function parsingQuiz(order) {
  if (order >= items.length) {
    modalHide();
    printPreview();
    return false;
  }
  sendRequest(previewQuiz, urlquiz + items[order])
}

function setHeader(data) {
  header = '<table border="0" width="100%">';
  header += '<tr><th colspan="5">Naskah Soal</th></tr>'
  header += '<tr>';
  header += '<td>Mata Pelajaran</td>';
  header += '<td>: ' + data.course + '</td>';
  header += '<td></td>';
  header += '<td>Tanggal</td>';
  header += '<td>: ' + data.start + '</td>';
  header += '</tr>';
  header += '</table>';
}

function loadQuiz(response) {
  setHeader(response.header);
  $.each(response.body, function(i, v) {
    items.push(v.id);
  })
  urlquiz = 'teacher/read/evaluation_item/';
  parsingQuiz(order);
}

function directPrint() {
  $('#myModal').modal('show');
  $('#dialog-body').html('<div id="loader-quiz">Sedang Memproses Data</div>').show();
  $('#dialog-body').append('<div id="quiz-preview"><ol id="quiz"></ol></div>');
  $('#quiz-preview').hide();
  $('#loader-quiz').html('<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%">Prosess 0%</div></div>').show();
  sendRequest(loadQuiz, objTriger.attr('target'));
}
var items = [];
var order = 0;
var header;
//var directPrintLib = true;
