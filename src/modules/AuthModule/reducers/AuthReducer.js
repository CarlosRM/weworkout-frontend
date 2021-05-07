import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addFavoriteRoutine, followUser, getUsers, loginUser, loginUserWithToken, logoutUser, removeFavoriteRoutine, unfollowUser } from '../../ApiModule/api'
import Cookies from 'universal-cookie'
import { getAllUsers } from '../../UserModule/reducers/UserReducer'

const initialState = {
  login: {
    success: false,
    error: false,
    errorMsg: null,
    loading: false
  },
  loginWithToken: {
    success: false,
    error: false,
    errorMsg: null,
    loading: false
  },
  logout: {
    success: false,
    error: false,
    errorMsg: null,
    loading: false
  },
  addFavorite: {
    success: false,
    error: false,
    errorMsg: null,
    loading: false
  },
  removeFavorite: {
    success: false,
    error: false,
    errorMsg: null,
    loading: false
  },
  follow: {
    success: false,
    error: false,
    errorMsg: null,
    loading: false
  },
  unfollow: {
    success: false,
    error: false,
    errorMsg: null,
    loading: false
  },
  user: null
}

/**
 * Login a user:
 */
export const login = createAsyncThunk('auth/login', async (data) => {
  const response = {
    status: 200,
    user: null,
    error: null
  }

  let loginResponse = await loginUser(data.email, data.password)
  const status = loginResponse.status
  loginResponse = await loginResponse.json()
  if (status !== 200) {
    response.status = status
    response.error = loginResponse.error
    return response
  } else {
    const token = loginResponse.access_token
    const cookies = new Cookies()
    cookies.set('WeWorkoutToken', token, { path: '/' })
    response.user = loginResponse.user
  }
  return response
})

/**
 * Login a user with token:
 */
export const loginWithToken = createAsyncThunk('auth/loginWithToken', async (data, thunkAPI) => {
  const response = {
    status: 200,
    user: null,
    error: null
  }

  const token = new Cookies().get('WeWorkoutToken')
  let loginResponse = await loginUserWithToken(token)
  const status = loginResponse.status
  loginResponse = await loginResponse.json()
  if (status !== 200) {
    response.status = status
    response.error = loginResponse.error
    return response
  } else {
    response.user = loginResponse.user
  }
  return response
})

/**
 * Logout a user
 */
export const logout = createAsyncThunk('auth/logout', async (data, thunkAPI) => {
  const response = {
    status: 200
  }

  const token = new Cookies().get('WeWorkoutToken')
  let logoutResponse = await logoutUser(token)
  const status = logoutResponse.status
  logoutResponse = await logoutResponse.json()
  if (status !== 200) {
    response.status = status
    response.error = logoutResponse.error
    return response
  }
  return response
})

/**
 * Add favorite
 */
export const addFavorite = createAsyncThunk('auth/addFavorite', async (data) => {
  const response = {
    status: 200,
    message: '',
    routineId: null,
    error: null
  }

  let addFavoriteResponse = await addFavoriteRoutine(data.token, data.userId, data.routineId)
  const status = addFavoriteResponse.status
  addFavoriteResponse = await addFavoriteResponse.json()
  if (status !== 200) {
    response.status = status
    response.error = addFavoriteResponse.error
    return response
  } else {
    response.routineId = addFavoriteResponse.data.id
  }
  return response
})

/**
 * Remove favorite
 */
export const removeFavorite = createAsyncThunk('auth/removeFavorite', async (data) => {
  const response = {
    status: 200,
    message: '',
    routineId: null,
    error: null
  }

  let removeFavoriteResponse = await removeFavoriteRoutine(data.token, data.userId, data.routineId)
  const status = removeFavoriteResponse.status
  removeFavoriteResponse = await removeFavoriteResponse.json()
  if (status !== 200) {
    response.status = status
    response.error = removeFavoriteResponse.error
    return response
  } else {
    response.routineId = removeFavoriteResponse.data.id
  }
  return response
})

/**
 * Follow user
 */
export const follow = createAsyncThunk('auth/follow', async (data, thunkAPI) => {
  const response = {
    status: 200,
    message: '',
    userId: null,
    error: null
  }

  let followResponse = await followUser(data.token, data.id, data.followeeId)
  const status = followResponse.status
  followResponse = await followResponse.json()
  if (status !== 200) {
    response.status = status
    response.error = followResponse.error
    return response
  } else {
    response.userId = followResponse.data
    thunkAPI.dispatch(getAllUsers())
  }
  return response
})

/**
 * Unfollow user
 */
export const unfollow = createAsyncThunk('auth/unfollow', async (data, thunkAPI) => {
  const response = {
    status: 200,
    message: '',
    userId: null,
    error: null
  }

  let unfollowResponse = await unfollowUser(data.token, data.id, data.followeeId)
  const status = unfollowResponse.status
  unfollowResponse = await unfollowResponse.json()
  if (status !== 200) {
    response.status = status
    response.error = unfollowResponse.error
    return response
  } else {
    response.userId = unfollowResponse.data
    thunkAPI.dispatch(getAllUsers())
  }
  return response
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state, action) => {
        state = {
          ...initialState,
          login: {
            ...initialState.login,
            loading: true
          }
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login.loading = false
        if (action.payload.status === 200) {
          state.login.success = true
          state.user = action.payload.user
        } else {
          state.login.error = true
          state.login.errorMsg = action.payload.error
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.login.loading = false
        state.login.error = true
      })
      .addCase(loginWithToken.pending, (state, action) => {
        state = {
          ...initialState,
          loginWithToken: {
            ...initialState.loginWithToken,
            loading: true
          }
        }
      })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.loginWithToken.loading = false
        if (action.payload.status === 200) {
          state.loginWithToken.success = true
          state.user = action.payload.user
        } else {
          state.loginWithToken.error = true
          state.loginWithToken.errorMsg = action.payload.error
        }
      })
      .addCase(loginWithToken.rejected, (state, action) => {
        state.loginWithToken.loading = false
        state.loginWithToken.error = true
      })
      .addCase(logout.pending, (state, action) => {
        state = {
          ...initialState,
          logout: {
            ...initialState.logout,
            logout: true
          }
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.login.loading = false
        if (action.payload.status === 200) {
          state.logout.success = true
        } else {
          state.logout.error = true
          state.logout.errorMsg = action.payload.error
        }
      })
      .addCase(logout.rejected, (state, action) => {
        state.logout.loading = false
        state.logout.error = true
      })
      .addCase(addFavorite.pending, (state, action) => {
        state = {
          ...initialState,
          addFavorite: {
            ...initialState.addFavorite,
            loading: true
          }
        }
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.addFavorite.loading = false
        if (action.payload.status === 200) {
          state.addFavorite.success = true
          state.user.favourite_routines = [...state.user.favourite_routines, action.payload.routineId]
        } else {
          state.addFavorite.error = true
          state.addFavorite.errorMsg = action.payload.error
        }
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.addFavorite.loading = false
        state.addFavorite.error = true
      })
      .addCase(removeFavorite.pending, (state, action) => {
        state = {
          ...initialState,
          removeFavorite: {
            ...initialState.removeFavorite,
            loading: true
          }
        }
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.removeFavorite.loading = false
        if (action.payload.status === 200) {
          state.removeFavorite.success = true
          state.user.favourite_routines = state.user.favourite_routines.filter(el => el !== action.payload.routineId)
        } else {
          state.removeFavorite.error = true
          state.removeFavorite.errorMsg = action.payload.error
        }
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.removeFavorite.loading = false
        state.removeFavorite.error = true
      })
      .addCase(follow.fulfilled, (state, action) => {
        state.follow.loading = false
        if (action.payload.status === 200) {
          state.follow.success = true
          state.user.followees = [...state.user.followees, action.payload.userId]
        } else {
          state.follow.error = true
          state.follow.errorMsg = action.payload.error
        }
      })
      .addCase(follow.rejected, (state, action) => {
        state.follow.loading = false
        state.follow.error = true
      })
      .addCase(follow.pending, (state, action) => {
        state = {
          ...initialState,
          follow: {
            ...initialState.follow,
            loading: true
          }
        }
      })
      .addCase(unfollow.rejected, (state, action) => {
        state.unfollow.loading = false
        state.unfollow.error = true
      })
      .addCase(unfollow.pending, (state, action) => {
        state = {
          ...initialState,
          unfollow: {
            ...initialState.unfollow,
            loading: true
          }
        }
      })
      .addCase(unfollow.fulfilled, (state, action) => {
        state.unfollow.loading = false
        if (action.payload.status === 200) {
          state.unfollow.success = true
          state.user.followees = state.user.followees.filter(el => el !== action.payload.userId)
        } else {
          state.unfollow.error = true
          state.unfollow.errorMsg = action.payload.error
        }
      })
  }
})

export default authSlice.reducer
