var viewItem = {
  title: "Bahan Ajar",
  target: "student/grid/",
  head: ["Pokok Bahasan / Sub Pokok Bahasan"],
  button: {
    print: {
      target: "student/print/",
      icon: "fa fa-print"
    }
  },
  dropdown: {
    primary: [{
      name: "classroom_id-course_id",
      target: "student/dropdown/dropdown_classroomCourse",
      label: "Pilih Mata Pelajaran"
    }]
  },
  grid: {
    topic: {
      type: "cell"
    }
  },
  action: [{
    target: "student/read/",
    icon: "fa fa-eye",
    type: "btn-read",
    label: "Jabaran Materi"
  }]
}
var viewType = {
  lesson: true
}
