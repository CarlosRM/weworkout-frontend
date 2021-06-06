
/* Validates that the field is not empty */
export function isRequired (param) {
  let pass = true
  if (param === undefined || param === null || param === '') {
    pass = false
  }
  return { success: pass, description: 'Este campo es necesario' }
}

/* Validates that the field is email
 * This is not a thorough validation and should not be fully trusted. It is designed to minimize
 * user errors, but the way to determine if the email address exists is to simply send an email to it
*/
export function isEmail (param) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return { success: re.test(String(param).toLowerCase()), description: 'Este campo debe ser un email' }
}

export function matchesPassword (param1, param2) {
  const pass = (param1 === param2.password.value)
  return { success: pass, description: 'Las contraseñas deben coincidir' }
}

export function matchesConfirmPassword (param1, param2) {
  const pass = (param1 === param2.confirmPassword.value)
  return { success: pass, description: 'Las contraseñas deben coincidir' }
}
