import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'
import { getRoutines } from '../../ApiModule/api'

const initialState = {
  getAllRoutines: {
    success: false,
    error: false,
    errorMsg: null,
    loading: false
  },
  allRoutines: []
}

/**
 * Login a user:
 */
export const getAllRoutines = createAsyncThunk('routines/getAllRoutines', async (data) => {
  const response = {
    status: 200,
    routines: null,
    error: null
  }

  const token = new Cookies().get('WeWorkoutToken')
  let getAllRoutinesResponse = await getRoutines(token)
  const status = getAllRoutinesResponse.status
  getAllRoutinesResponse = await getAllRoutinesResponse.json()
  if (status !== 200) {
    response.status = status
    response.error = getAllRoutinesResponse.error
    return response
  } else {
    response.routines = getAllRoutinesResponse.data
  }
  return response
})

const routinesSlice = createSlice({
  name: 'routines',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getAllRoutines.pending, (state, action) => {
        state = {
          ...initialState,
          getAllRoutines: {
            ...initialState.getAllRoutines,
            loading: true
          }
        }
      })
      .addCase(getAllRoutines.fulfilled, (state, action) => {
        state.getAllRoutines.loading = false
        if (action.payload.status === 200) {
          state.getAllRoutines.success = true
          state.allRoutines = action.payload.routines
        } else {
          state.getAllRoutines.error = true
          state.getAllRoutines.errorMsg = action.payload.error
        }
      })
      .addCase(getAllRoutines.rejected, (state, action) => {
        state.getAllRoutines.loading = false
        state.getAllRoutines.error = true
      })
  }
})

export default routinesSlice.reducer
