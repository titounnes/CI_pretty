var authJSON = {
  title: "Form Perubahan Email",
  input: {
    email: {
      field: "email",
      label: "Email Baru",
      icon: "envelope",
      validation: 'required data-validation-error-msg="Wajib diisi"'
    },
    new_password: {
      field: "password",
      label: "Password Anda",
      icon: "eye",
      validation: 'required data-validation-error-msg="Wajib Diisi"'
    }
  },
  button: [{
    target: "user/changeEmail",
    type: "btn-save-one",
    class: "btn btn-default",
    label: "Submit",
    icon: "fa fa-lock"
  }]
}
