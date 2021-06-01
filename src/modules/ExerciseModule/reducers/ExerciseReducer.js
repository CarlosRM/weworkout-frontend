import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'
import { getExercises } from '../../ApiModule/api'

const initialState = {
  getAllExercises: {
    success: false,
    error: false,
    errorMsg: null,
    loading: false
  },
  allExercises: []
}

/**
 * Login a user:
 */
export const getAllExercises = createAsyncThunk('routines/getAllExercises', async (data) => {
  const response = {
    status: 200,
    exercises: null,
    error: null
  }

  const token = new Cookies().get('WeWorkoutToken')
  let getAllExercisesResponse = await getExercises(token)
  const status = getAllExercisesResponse.status
  getAllExercisesResponse = await getAllExercisesResponse.json()
  if (status !== 200) {
    response.status = status
    response.error = getAllExercisesResponse.error
    return response
  } else {
    response.exercises = getAllExercisesResponse.data
  }
  return response
})

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getAllExercises.pending, (state, action) => {
        state = {
          ...initialState,
          getAllExercises: {
            ...initialState.getAllExercises,
            loading: true
          }
        }
      })
      .addCase(getAllExercises.fulfilled, (state, action) => {
        state.getAllExercises.loading = false
        if (action.payload.status === 200) {
          state.getAllExercises.success = true
          state.allExercises = action.payload.exercises
        } else {
          state.getAllExercises.error = true
          state.getAllExercises.errorMsg = action.payload.error
        }
      })
      .addCase(getAllExercises.rejected, (state, action) => {
        state.getAllExercises.loading = false
        state.getAllExercises.error = true
      })
  }
})

export default exercisesSlice.reducer
