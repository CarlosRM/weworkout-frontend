import { endpoint } from '../../../config'

export async function loginUser (email, password) {
  const loginUserResponse = await fetch(endpoint + 'api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  return loginUserResponse
}

export async function logoutUser (token) {
  const logoutUserResponse = await fetch(endpoint + 'api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token

    },
    body: JSON.stringify({
    })
  })
  return logoutUserResponse
}

export async function getCurrentUser (token) {
  const getCurrentUserResponse = await fetch(endpoint + 'api/auth/me', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({

    })
  })
  return getCurrentUserResponse
}
