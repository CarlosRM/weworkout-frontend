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

export async function loginUserWithToken (token) {
  const loginUserWithTokenResponse = await fetch(endpoint + 'api/auth/me', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
    })
  })
  return loginUserWithTokenResponse
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

export async function getRoutines (token) {
  const getRoutinesResponse = await fetch(endpoint + 'api/routines', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return getRoutinesResponse
}

export async function getCategories (token) {
  const getCategoriesResponse = await fetch(endpoint + 'api/categories', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return getCategoriesResponse
}
