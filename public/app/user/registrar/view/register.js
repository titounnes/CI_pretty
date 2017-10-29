var viewItem = {
  title: "Membuat Permohonan",
  target: "registrar/grid/",
  head: ["Pokok Bahasan / Sub Pokok Bahasan"],
  button: {
    print: {
      target: "registrar/print/",
      icon: "fa fa-print"
    }
  },
  dropdown: {
    primary: [{
      name: "classroom_id-course_id",
      option : {0: "Pilih Jenis Permohonan", 1: "Permohonan Ijin Baru",2: "Perpanjangan Ijin"},
    }]
  },
  grid: {
    register: {
      type: "cell"
    },
    type: {
      type : "cell"
    }
  },
  action: [{
    target: "registrar/read/",
    icon: "fa fa-eye",
    type: "btn-read",
    label: "Jabaran Materi"
  }]
}
var viewType = {
  lesson: true
}
