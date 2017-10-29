var authJSON = {
  title: "Form Perubahan Password",
  input: {
    old_password: {
      field: "old_password",
      label: "Password Lama",
      icon: "eye",
      validation: 'required data-validation-error-msg="Wajib diisi"'
    },
    new_password: {
      field: "new_password",
      label: "Password Baru",
      icon: "eye",
      validation: 'required data-validation-error-msg="Wajib Diisi"'
    }
  },
  button: [{
    target: "user/changePassword",
    type: "btn-save-one",
    class: "btn btn-default",
    label: "Submit",
    icon: "fa fa-lock"
  }],
  footer: ''
}
