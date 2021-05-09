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

export async function getUsers (token) {
  const getUsersResponse = await fetch(endpoint + 'api/users', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return getUsersResponse
}

export async function getExercises (token) {
  const getExercisesResponse = await fetch(endpoint + 'api/exercises', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return getExercisesResponse
}

export async function addFavoriteRoutine (token, userId, routineId) {
  const addFavoriteRoutineResponse = await fetch(endpoint + 'api/users/' + userId + '/addFavorite/' + routineId, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return addFavoriteRoutineResponse
}

export async function removeFavoriteRoutine (token, userId, routineId) {
  const removeFavoriteRoutineResponse = await fetch(endpoint + 'api/users/' + userId + '/removeFavorite/' + routineId, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return removeFavoriteRoutineResponse
}

export async function deleteUserRoutine (token, routineId) {
  const deleteUserRoutineResponse = await fetch(endpoint + 'api/routines/' + routineId, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return deleteUserRoutineResponse
}

export async function addUserRoutine (token, body) {
  const addUserRoutineResponse = await fetch(endpoint + 'api/routines/', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  return addUserRoutineResponse
}

export async function editUserRoutine (token, body, id) {
  const editUserRoutineResponse = await fetch(endpoint + 'api/routines/' + id, {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  return editUserRoutineResponse
}

export async function addUserComment (token, body, id) {
  const addUserCommentResponse = await fetch(endpoint + 'api/routines/' + id + '/comment', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  return addUserCommentResponse
}

export async function addUserRating (token, body, id) {
  const addUserRatingResponse = await fetch(endpoint + 'api/routines/' + id + '/rating', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  return addUserRatingResponse
}

export async function followUser (token, id, followeeId) {
  const followUserRoutineResponse = await fetch(endpoint + 'api/users/' + id + '/follow/' + followeeId, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return followUserRoutineResponse
}
export async function unfollowUser (token, id, followeeId) {
  const unfollowUserRoutineResponse = await fetch(endpoint + 'api/users/' + id + '/unfollow/' + followeeId, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return unfollowUserRoutineResponse
}

export async function addUser (body) {
  const addUserRoutineResponse = await fetch(endpoint + 'api/users/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)

  })
  return addUserRoutineResponse
}

export async function editUser (token, id, body) {
  const editUserRoutineResponse = await fetch(endpoint + 'api/users/' + id, {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)

  })
  return editUserRoutineResponse
}
