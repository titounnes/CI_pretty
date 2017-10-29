var dataPivot = {};
var headerPivot = {};
function difficulty(){
	var items = {};
	var number = 1;
	$.each(headerPivot, function(i, v){
		var item = {};
		item['competence'] = v.competence;
		item['indicator'] = v.indicator;
		item['count'] = 0;
		item['sum'] = 0;
		item['number'] = number;
		items[i] = item;
		number++;
	})
	$.each(dataPivot, function(i, v){
		$.each(v[1].data, function(j, w){
			items[j]['count'] ++;
			items[j]['sum'] += w.score*1;
		})
	})
	var table = '<table class="table table-condensed"><thead><caption>Indeks Kesukaran</caption><tr align="center"><th>Item</th><th>Kompetensi</th><th>Indikator</th>'+
		'<th>N</th><th>P(B)</th><th>T</th><th>Predikat</th></tr></thead>'+
		'<tbody>';
	$.each(items, function(i, v){
		table += '<tr align="left">';
		table += '<td align="right">'+v.number+'</td>';
		table += '<td>'+v.competence+'</td>';
		table += '<td>'+v.indicator+'</td>';
		table += '<td align="center">'+v.count+'</td>';
		table += '<td align="center">'+v.sum+'</td>';
		var t = v.sum/v.count;
		table += '<td align="center">'+decimal(t, 3)+'</td>';
		table += '<td align="center">'+(t <=0.3 ? 'Sukar' : (t<= 0.7 ? 'Sedang' : 'Mudah'))+'</td>';
		table +='</tr>';
	})
	table +='</tbody></table>';
	$('#statistic').html(table)
}
function discriminant(){
	var items = {};
	var number = 1;
	$.each(headerPivot, function(i, v){
		var item = {};
		item['competence'] = v.competence;
		item['indicator'] = v.indicator;
		item['count_hi'] = 0;
		item['sum_hi'] = 0;
		item['count_lo'] = 0;
		item['sum_lo'] = 0;
		item['number'] = number;
		items[i] = item;
		number++;
	})
	var midle = (dataPivot.length+1)/2;
	number = 1;
	$.each(dataPivot, function(i, v){
		$.each(v[1].data, function(j, w){
			if(number<midle){
				items[j]['count_hi'] ++;
				items[j]['sum_hi'] += w.score*1;
			}else if(number > midle){
				items[j]['count_lo'] ++;
				items[j]['sum_lo'] += w.score*1;
			}
		})
		number++;
	})
	var table = '<table class="table table-condensed"><thead><caption>Daya Pembeda</caption><tr align="center"><th>Item</th><th>Kompetensi</th><th>Indikator</th>'+
		'<th>N</th><th>P(A)</th><th>P(B)</th>'+
		'<th>D</th><th>Predikat</th></tr></thead>'+
		'<tbody>';
	$.each(items, function(i, v){
		table += '<tr align="left">';
		table += '<td align="center">'+v.number+'</td>';
		table += '<td>'+v.competence+'</td>';
		table += '<td>'+v.indicator+'</td>';
		table += '<td align="center">'+(v.count_hi)+'</td>';
		table += '<td align="center">'+decimal(v.sum_hi/v.count_hi,3)+'</td>';
		table += '<td align="center">'+decimal(v.sum_lo/v.count_lo, 3)+'</td>';
		var d = (v.sum_hi-v.sum_lo)/v.count_lo;
		table += '<td align="center">'+decimal(d, 3)+'</td>';
		table += '<td align="center">'+(d < 0 ? 'Sangat Jelek' : (d <= 0.2 ? 'Jelek' : (d <= 0.4 ? 'Cukup' : d <= 0.7 ? 'Baik' : 'Baik Sekali')))+'</td>';
		table +='</tr>';
	})
	table +='</tbody></table>';
	$('#statistic').html(table)
}
function validity(){
	var items = {};
	var number = 1;
	$.each(headerPivot, function(i, v){
		var item = {};
		item['competence'] = v.competence;
		item['indicator'] = v.indicator;
		item['sumX'] = 0;
		item['sumY'] = 0;
		item['sumSqX'] = 0;
		item['sumSqY'] = 0;
		item['sumXY'] = 0;
		item['count'] = 0;
		item['number'] = number;
		items[i] = item;
		number++;
	})
	$.each(dataPivot, function(i, v){
		$.each(v[1].data, function(j, w){
			items[j]['count'] ++;
			items[j]['sumX'] +=w.score*1;
			items[j]['sumSqX'] +=w.score*1;
			items[j]['sumY'] +=v[1].sum;
			items[j]['sumSqY'] +=v[1].sum*v[1].sum;
			items[j]['sumXY'] += w.score*v[1].sum;
		})
	})
	var table = '<table class="table table-condensed"><thead><caption>Validitas (Pearson\'s Correlation) </caption><tr align="center"><th>Item</th><th>Kompetensi</th><th>Indikator</th>'+
		'<th>N</th><th>s<sup>2</sup><sub>x</sub></th><th>s<sup>2</sup><sub>y</sub></th>'+
		'<th>s<sup>2</sup><sub>xy</sub></th><th>r<sub>xy</sub></th></tr></thead>'+
		'<tbody>';
	$.each(items, function(i, v){
		table += '<tr>';
		table += '<td align="right">'+v.number+'</td>';
		table += '<td>'+v.competence+'</td>';
		table += '<td>'+v.indicator+'</td>';
		table += '<td align="right">'+(v.count)+'</td>';
		var sx = v.sumSqX-v.sumX*v.sumX/v.count;
		var sy = v.sumSqY-v.sumY*v.sumY/v.count;
		var sxy = v.sumXY-v.sumX*v.sumY/v.count;
		var rxy = sx*sy > 0 ? sxy/Math.sqrt(sx*sy) : '-';
		table += '<td align="right">'+decimal(sx,3)+'</td>';
		table += '<td align="right">'+decimal(sy,3)+'</td>';
		table += '<td align="right">'+decimal(sxy, 3)+'</td>';
		table += '<td align="right">'+(rxy == '-' ? '-' :decimal(rxy, 3))+'</td>';
		table +='</tr>';
	})
	table +='</tbody></table>';
	table += '<a target="_blank" href="http://www.life.illinois.edu/ib/203/Fall%2009/PEARSONS%20CORRELATION%20COEFFICIENT%20TABLE.pdf">Daftar Nilai Kritis</a>';
	$('#statistic').html(table)
}
function reliability(){
	var tot = dataPivot.length;
	var y = 0;
	var si = 0;
	var y2 = 0;
	var k = countObj(headerPivot);
	var item  = {}
	$.each(headerPivot, function(i, v){
		item[i] =0;
	})
	$.each(dataPivot, function(i, v){
		$.each(v[1].data, function(j, w){
			item[j] +=w.score*1;
		})
		y +=v[1].sum;
		y2 +=v[1].sum*v[1].sum;
	})
	$.each(item, function(i, v){
		si += v*(tot-v)/(tot*tot);
	})
	var table = '<table class="table table-condensed"><thead><caption>Reliabilitas (Alpha\'s Croncbach)</caption><tr align="center"><th>K</th><th>sum(s<sup>2</sup><sub>i</sub>)</th>'+
		'<th>s<sup>2</sup><sub>t</sub></th><th>r<sub>11</sub></th><th>Predikat</th></tr></thead>'+
		'<tbody>';
	var st = (y2-y*y/tot)/(tot-1);
	var r11 =  (k/(k-1))*(1-si/st);
	table += '<tr align="center"><td>'+k+'</td>';
	table += '<td>'+decimal(si, 3)+'</td>';
	table += '<td>'+decimal(st, 3)+'</td>';
	table += '<td>'+(st > 0 ? decimal(r11, 10) : '-')+'</td>';
	table += '<td>'+(r11 < 0.5 ? 'Ditolak' : (r11 < 0.6 ? 'Jelek' : (r11 < 0.7 ? 'Dipertanyakan' : (r11 < 0.8 ? 'Diterima dengan perbaikan' : (r11 < 0.9 ? 'Bagus' : 'Sangat Bagus')))))+'</td>';
	table +='</tr></tbody></table>';
	$('#statistic').html(table)
}
function predictor(){
	var items = {};
	var number = 1;
	$.each(headerPivot, function(i, v){
		var item = {};
		item['competence'] = v.competence;
		item['indicator'] = v.indicator;
		item['number'] = number;
		item[1] = 0;
		item[2] = 0;
		item[3] = 0;
		item[4] = 0;
		item[5] = 0;
		item['answer'] = v.answer;
		items[i] = item;
		number++;
	})
	$.each(dataPivot, function(i, v){
		$.each(v[1].data, function(j, w){
			items[j][w.answer]++;
		})
	})
	var table = '<table class="table table-condensed"><thead><caption>Analisis Prediktor</caption>'+
		'<tr align="center"><th rowspan="2">Item</th><th rowspan="2">Kompetensi</th>'+
		'<th rowspan="2">Indikator</th><th rowspan="2">Kunci</th><th colspan="5">Distribusi Jawaban</th></tr>'+
		'<tr><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr></thead>'+
		'<tbody>';
	$.each(items, function(i, v){
		table += '<tr align="left">';
		table += '<td align="right">'+v.number+'</td>';
		table += '<td>'+v.competence+'</td>';
		table += '<td>'+v.indicator+'</td>';
		table += '<td>'+String.fromCharCode(64+v.answer*1)+'</td>';
		for(i=1; i<6;i++){
			table += '<td align="center">'+v[i]+'</td>';
		}
		table += '</tr>';
	})
	table += '</tbody></table>';
	$('#statistic').html(table)
}
function statistic()
{
	$('#myModal').modal('show');
	$('#text-body').hide();
	var text = '<a href="#" class="btn btn-default analisys" type="difficulty">Tingkat Kesukaran</a>';
	text += '<a href="#" class="btn btn-default analisys" type="discriminant">Daya Beda</a>';
	text += '<a href="#" class="btn btn-default analisys" type="validity">Validitas</a>';
	text += '<a href="#" class="btn btn-default analisys" type="reliability">Reliabiitas</a>';
	text += '<a href="#" class="btn btn-default analisys" type="predictor">Analisis Prediktor</a>';
	text += '<div class="table table-responsive" id="statistic"></div>';
	$('#dialog-body').html(text)
	difficulty();
}
function sortObj(obj){
	var arr = [];
	$.each(obj, function(i, v){
		arr.push([v.sum,  v]);
	})
	arr.sort(function(a, b){
		return b[0] - a[0];
	})
	return arr;
}
function pivot(response){
	console.log(response)
	var countItem = countObj(response.columns)
	var table = '<table class="table table-condensed"><thead><tr><th rowspan="2">No</th><th rowspan="2">NIM</th>';
	table +='<th colspan="'+countItem+'">Item Ke-</th><th rowspan="2">Jumlah</th></tr><tr>';
	for(j=1; j<= countItem ; j++){
		table += '<th>'+j+'</th>';
	}
	table +='</tr></thead><tbody>';
	var data = {};
	if(response.body.length == 0){
		table += '</tbody></table>';
		$('#table').html(table);
		return 1;
	}
	$.each(response.rows, function(i, v){
		data[v.id] = {};
		data[v.id].id = v.id;
		data[v.id].username = v.username;
		data[v.id].data = {};
	})

	$.each(response.body, function(i, v){
		data[v.student_id].data[v.instrument_id] = {};
		data[v.student_id].data[v.instrument_id].answer = v.answer;
		data[v.student_id].data[v.instrument_id].score = 0;
		data[v.student_id].sum = 0;
	})
	var header = {};
	$.each(response.columns, function(i, v){
		header[v.id] = v;
		$.each(response.rows, function(j, w){
			if(typeof data[w.id].data[v.id] == 'undefined'){
				data[w.id].data[v.id] = {};
				data[w.id].data[v.id].score = 0;
				data[w.id].data[v.id].answer = 0;
			}else{
				if(data[w.id].data[v.id].answer==v.answer){
					data[w.id].data[v.id].score = 1;
					data[w.id].sum += 1;
				}else{
					data[w.id].data[v.id].score = 0;
				}
			}
		})
	})
	dataPivot = sortObj(data);
	headerPivot = header;
	var k =1;
	$.each(dataPivot, function(i,v){
		table += '<tr><td align="right">'+k+'</td><td>'+v[1].username+'</td>';
		$.each(v[1].data, function(j, w){
			table += '<td align="right">'+w.score+'</td>';
		})
		table += '<td align="right">'+v[1].sum+'</td></tr>';
		k++;
	})
	$('#table').html(table);
	$('#table').prepend('<a href="#" class="btn btn-default" type="btn-analysis">Analisis</a>');
}
//var statisticJS = true;
