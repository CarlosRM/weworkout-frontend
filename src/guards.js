/**
 * Returns if the user is logged in
 * @param {*} loginState an object representing the user state
 * @returns true if loginState.isLoggedIn, false otherwise
 */

export function isUserLoggedIn (state) {
  return state.auth.user !== null
}

/**
 * Returns if the user is logged out
 * @param {*} loginState an object representing the user state
 * @returns false if loginState.isLoggedIn, true otherwise
 */

export function isUserLoggedOut (state) {
  return state.auth.user === null
}
