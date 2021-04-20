
/* Validates that the field is not empty */
export function isRequired (param) {
  let pass = true
  if (param === undefined || param === null || param === '') {
    pass = false
  }
  return { success: pass, description: 'Este campo es necesario' }
}

/**
 * Validates that the field has between min and max number of characters
 * @param {string} param the content of the field
 * @param {int} min the minimum amount of characters allowed
 * @param {int} max the maximum amount of characters allowed
 * @returns an object with property success === true if param length between min and max
 */
export function numberOfCharacters (param, min, max) {
  let pass = true
  if (typeof param !== 'string') pass = false
  else if (param.length < min || param.length > max) {
    pass = false
  }
  return { success: pass, description: 'Debe tener entre ' + min + ' y ' + max + ' caracteres' }
}

/* Validates that the field has mixed letters (uppercase and lowercase) */
export function mixedLetters (param) {
  let pass = false
  if (/[a-z]/.test(param) && /[A-Z]/.test(param)) {
    pass = true
  }
  return { success: pass, description: 'Debe tener letras mayúsculas y minúsculas' }
}

/* Validates that the field has numbers and special characters */
export function numbersAndSpecialCharacters (param) {
  let pass = false
  if (/[0-9]/.test(param) && /[!@#$%^&*()_,.?":{}|<>]/.test(param)) {
    pass = true
  }
  return { success: pass, description: 'Debe tener números y caracteres especiales' }
}

/* Validates that the field is email
 * This is not a thorough validation and should not be fully trusted. It is designed to minimize
 * user errors, but the way to determine if the email address exists is to simply send an email to it
*/
export function isEmail (param) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return { success: re.test(String(param).toLowerCase()), description: 'Este campo debe ser un email' }
}
