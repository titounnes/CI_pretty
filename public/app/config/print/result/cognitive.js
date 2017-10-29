var configPDF = {
	title :{
		main : {
			text : 'Laporan Nilai Aspek Pengetahuan',
			fontSize: 18,
			bold: true,
			alignment: 'center',
		},
		second : {
			text : 'Kelas ==kelas== Semester ==semester== Tahun ==tahun==/==tahun+1==',
			fontSize: 15,
			bold: true,
			alignment: 'center',
		}
	}, 
	config : {
		orientation : 'portrait',
		rowhead : 2,
		widths : [20, 30, 40, 50],	
		pageSise : 'folio',
		margin : [30, 30, 30, 30],
	},
	head : {
		main : [
			{
				text : 'No',
				alignment : 'center',
				bold : true,
				rowSpan : 2,
				style: 'tableHeader',
			},
			{
				text : 'NISN',
				alignment : 'center',
				bold : true,
				rowSpan : 2,
				style: 'tableHeader',
			},
			{
				text : 'Nama',
				alignment : 'center',
				bold : true,
				rowSpan : 2,
				style: 'tableHeader',
			},
			{
				text : 'L/P',
				alignment : 'center',
				bold : true,
				rowSpan : 2,
				style: 'tableHeader',
			},
			{
				text : 'Nilai',
				alignment : 'center',
				bold : true,
				colSpan : 5,
				style: 'tableHeader',
			},'','','','',
		], 
		second : [
			'','','','',
			{
				text : 'Harian',
				alignment : 'center',
				bold : true,
				style: 'tableHeader',
			},
			{
				text : 'Remidial',
				alignment : 'center',
				bold : true,
				style: 'tableHeader',
			},
			{
				text : 'Tengah Semester',
				alignment : 'center',
				bold : true,
				style: 'tableHeader',
			},
			{
				text : 'Akhir Semester',
				alignment : 'center',
				bold : true,
				style: 'tableHeader',
			},
			{
				text : 'Rata Rata',
				alignment : 'center',
				bold : true,
				style: 'tableHeader',
			},
		],
	},
	body : {
		dataKey: ['username','original_name','gender','daily','remidial','midle','final','mean'],
		alignment : ['left','left','center','right','right','right','right','right'],
		valign : ['midle','midle','midle','midle','midle','midle','midle','midle'],
	},
};