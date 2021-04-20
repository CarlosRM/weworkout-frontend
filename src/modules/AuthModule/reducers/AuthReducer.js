import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginUser, loginUserWithToken, logoutUser } from '../../ApiModule/api'
import Cookies from 'universal-cookie'

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
  console.log(loginResponse)
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
  }
})

export default authSlice.reducer
