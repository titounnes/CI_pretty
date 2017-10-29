var session = parseJWT(sessionStorage['jwt']);
if(session.semester==2){
  var testType = {'21':'Ulangan Harian (Blok)','22':'Ulangan Remidi','23':'Ulangan Tengah Semester','24':'Ulangan Akhir Semester','31':'Uji Coba Ujian Akhir'}
}else{
  var testType = {'11':'Ulangan Harian (Blok)','12':'Ulangan Remidi','13':'Ulangan Tengah Semester','14':'Ulangan Akhir Semester'}
}
var formItem = {title:"Form Evaluasi",button:{save:{target:"teacher/save/",icon:"fa fa-floppy-o",class:"btn btn-info btn-save",value:"",type:"btn-save-one"}},field:{title:{field:"title",type:"text",label:"Judul Tes",validation:"required",err:"Wajib diisi",data:""},token:{field:"token",type:"text",label:"Token",validation:'required',err:"Wajib diisi",data:""},quiz_type:{field:"quiz_type",type:"select",option:{        source: testType},label:"Jenis Tes",validation:'required',err:"Wajib diisi",data:""},start:{field:"start",type:"date-time",label:"Mulai",validation:'required min="'+minDateFormal+'" max="'+maxDateFormal+'"',err:message,data:now},finish:{field:"finish",type:"date-time",label:"Selesai",validation:'required min="'+minDateFormal+'" max="'+maxDateFormal+'"',err:message,data:now}}}
var formType = {teacher:{evaluation_list:true}}
