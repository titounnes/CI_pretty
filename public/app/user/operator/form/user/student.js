var formItem = {
  title: "Form Data Siswa ",
  button: {
    save: {
      target: "operator/addMass/",
      icon: "fa fa-floppy-o",
      class: "btn btn-info btn-save-mass",
      value: "",
      type: "btn-save-mass"
    }
  },
  field: {
    username: {
      field: "username",
      type: "select",
      label: "Kolom ID Pengguna",
      data : 1,
      option: {
        source: {
          1: "1",
          2: "2",
          3: "3",
          4: "4"
        }
      }
    },
    original_name: {
      field: "original_name",
      type: "select",
      label: "Kolom Nama",
      data : 2,
      option: {
        source: {
          1: "1",
          2: "2",
          3: "3",
          4: "4"
        }
      }
    },
    password: {
      field: "password",
      type: "select",
      label: "Kolom Password",
      data : 3,
      option: {
        source: {
          1: "1",
          2: "2",
          3: "3",
          4: "4"
        }
      }
    },
    gender: {
      field: "gender",
      type: "select",
      label: "Kolom Jenis Kelamin",
      data : 4,
      option: {
        source: {
          1: "1",
          2: "2",
          3: "3",
          4: "4"
        }
      }
    }
  }
}
var formType = {
  studenrMass: true
}
