var session = parseJWT(sessionStorage['jwt']);
if(session.semester==2){
  var testType = {'21':'Ulangan Harian (Blok)','22':'Ulangan Remidi','23':'Ulangan Tengah Semester','24':'Ulangan Akhir Semester','31':'Uji Coba Ujian Akhir'}
}else{
  var testType = {'11':'Ulangan Harian (Blok)','12':'Ulangan Remidi','13':'Ulangan Tengah Semester','14':'Ulangan Akhir Semester'}
}
var viewItem = {title:"Daftar Test",target:"teacher/grid/",head:["Judul Test","Token","Jenis Tes","Mulai","Selesai","Acak Jawaban","Dengan Token","Tombol Navigasi"],button:{addnew:{target:"teacher/form/",icon:"fa fa-file-o",label:"Buat Baru"},save:{target:"teacher/submit/",icon:"fa fa-floppy-o",label:"Simpan"}},dropdown:{primary:[{name:"classroom_id-course_id",target:"teacher/dropdown/dropdown_classroomCourse",label:"Pilih Mata Pelajaran"}]},grid:{title:{type:"text"},token:{type:"text"},quiz_type:{type:"select",option:{source: testType}},start:{type:"date-time"},finish:{type:"date-time"},random:{type:"select",option:{source:["Urut","Acak"]}},token_required:{type:"select",option:{source:["Tidak Diminta","Wajib"]}},navigation:{type:"select",option:{source:["Ditampilkan","Disembunyikan"]}}},action:[{target:"teacher/delete/",icon:"fa fa-trash",type:"btn-delete",label:"Hapus"}]}
var viewType = {evaluation_list:true}
