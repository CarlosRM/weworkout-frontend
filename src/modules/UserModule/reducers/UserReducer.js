import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'
import { getUsers } from '../../ApiModule/api'

const initialState = {
  getAllUsers: {
    success: false,
    error: false,
    errorMsg: null,
    loading: false
  },
  allUsers: []
}

/**
 * Login a user:
 */
export const getAllUsers = createAsyncThunk('routines/getAllUsers', async (data) => {
  const response = {
    status: 200,
    users: null,
    error: null
  }

  const token = new Cookies().get('WeWorkoutToken')
  let getAllUsersResponse = await getUsers(token)
  const status = getAllUsersResponse.status
  getAllUsersResponse = await getAllUsersResponse.json()
  if (status !== 200) {
    response.status = status
    response.error = getAllUsersResponse.error
    return response
  } else {
    response.users = getAllUsersResponse.data
  }
  return response
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
        state = {
          ...initialState,
          getAllUsers: {
            ...initialState.getAllUsers,
            loading: true
          }
        }
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.getAllUsers.loading = false
        if (action.payload.status === 200) {
          state.getAllUsers.success = true
          state.allUsers = action.payload.users
        } else {
          state.getAllUsers.error = true
          state.getAllUsers.errorMsg = action.payload.error
        }
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.getAllUsers.loading = false
        state.getAllUsers.error = true
      })
  }
})

export default usersSlice.reducer
