var body = [];
function printing(){
	$('#modal-dialog').show();
	var target = objTriger.attr('target').replace(/_/,'/');
	var n = 1;
	$.getScript(baseUrl('config/print/'+target)).done(function(){
		body.push(configPDF.head.main);
		if(typeof configPDF.head.second != 'undefined'){
			body.push(configPDF.head.second)
		}
		$.each(openStorage(activeGrid).data, function(i,v){
			var content = [];
			var number = {};
			number.text = n;
			number.alignment = 'right';
			content.push(number);
			$.each(configPDF.body.dataKey, function(j, w){
				var cell = {};
				if(typeof v[w] != 'undefined' && v[w] != 0){
					cell.text = $('<textarea />').html(v[w]).text();
					cell.alignment = configPDF.body.alignment[j];
				}else{
					cell.text = '';
				}
				content.push(cell);
			})
			body.push(content)
			n++;
		})
		var dd = {
			content: [
			  	configPDF.title.main,
			  	configPDF.title.second,
			  	{
			     	table: {
			     		dontBreakRows: true,
			     		keepWithHeaderRows: 1,
			     		headerRows: configPDF.config.rowhead,
				        body: body,
			      	}
			    },
			],
			footer: function(page, pages) {
		    	return {
		        	columns: [
		            {
		                alignment: 'right',
		                text: [
		                    { text: page.toString(), italics: true },
		                    ' of ',
		                    { text: pages.toString(), italics: true }
		                ]
		            }
		        ],
		        margin: [10, 20],
		    	};
			},
			pageSize: configPDF.config.pageSize,
	    	margin : configPDF.config.margin,
    		pageOrientation: configPDF.config.orientation,
		}
		pdfMake.createPdf(dd).getDataUrl(viewer);
		function viewer(response){
			$('#dialog-body').html('<iframe src="'+response+'" type="application/pdf" width="100%" height="450" frameborder="no"></iframe>')
		}
		$('#myModal').modal('show');
	})
}
