function addItem(){
	param[$('.select-multiple').attr('name')] = $('.select-multiple').val();
	data = param;
	method = $('#table').attr('target').replace(/grid/,'add');
	sendRequest(adding, method, data);
}
function adding(response){
	if(response.status=='add'){
		showAlert('','Data berhasil ditambahkan');
		loadGrid();
	}else{
		showAlert('','Data gagal ditambahkan');
	}
}
