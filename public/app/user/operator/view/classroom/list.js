var viewItem = {title:"Daftar Kelas",target:"operator/grid/",dropdown:{primary:[{name:"category",option:{"0":"Pilih Kategori","1":"Regular","2":"Non Reguler"}}]},button:{addnew:{target:"operator/form/",icon:"fa fa-file-o",label:"Buat Baru"},save:{target:"operator/submit/",icon:"fa fa-floppy-o",label:"Simpan"}},head:["Kelas","Singkatan","Tingkat","Rombel"],grid:{title:{type:"text"},code:{type:"text"},grade:{type:"select",option:{source:["Tingkat","Pertama","Kedua","Ketiga","Keempat"]}},room:{type:"list"}}}
var viewType = {student:true}