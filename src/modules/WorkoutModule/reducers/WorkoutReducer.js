import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { NotificationManager } from 'react-notifications'
import Cookies from 'universal-cookie'
import { getWorkouts, addUserWorkout, editUserWorkout, deleteUserWorkout } from '../../ApiModule/api'

const initialState = {
  getAllMyWorkouts: {
    success: false,
    error: false,
    errorMsg: null,
    loading: false
  },
  deleteWorkout: {
    success: false,
    error: false,
    errorMsg: null,
    loading: false
  },
  addWorkout: {
    success: false,
    error: false,
    errorMsg: null,
    loading: false
  },
  editWorkout: {
    success: false,
    error: false,
    errorMsg: null,
    loading: false
  },
  allMyWorkouts: []
}

/**
 * Get All Workouts
 */
export const getAllMyWorkouts = createAsyncThunk('routines/getAllMyWorkouts', async (data) => {
  const response = {
    status: 200,
    routines: null,
    error: null
  }

  const token = new Cookies().get('WeWorkoutToken')
  let getAllMyWorkoutsResponse = await getWorkouts(token)
  const status = getAllMyWorkoutsResponse.status
  getAllMyWorkoutsResponse = await getAllMyWorkoutsResponse.json()
  if (status !== 200) {
    response.status = status
    response.error = getAllMyWorkoutsResponse.error
    return response
  } else {
    response.workouts = getAllMyWorkoutsResponse.data
  }
  return response
})

/**
 * Add workout
 */
export const addWorkout = createAsyncThunk('auth/addWorkout', async (data) => {
  const response = {
    status: 201,
    message: '',
    workout: null,
    error: null
  }

  let addWorkoutResponse = await addUserWorkout(data.token, data.body)
  const status = addWorkoutResponse.status
  addWorkoutResponse = await addWorkoutResponse.json()
  if (status !== 201) {
    response.status = status
    response.error = addWorkoutResponse.error
    NotificationManager.error('Ha habido un error añadiendo tu registro de ejercicio')
    return response
  } else {
    response.workout = addWorkoutResponse.data
    NotificationManager.success('Registro de ejercicio añadido con éxito')
  }
  return response
})

/**
 * Edit workout
 */
export const editWorkout = createAsyncThunk('auth/editWorkout', async (data) => {
  const response = {
    status: 201,
    message: '',
    workout: null,
    error: null
  }

  let editWorkoutResponse = await editUserWorkout(data.token, data.body, data.id)
  const status = editWorkoutResponse.status
  editWorkoutResponse = await editWorkoutResponse.json()
  if (status !== 201) {
    response.status = status
    response.error = editWorkoutResponse.error
    NotificationManager.error('Ha habido un error editando tu registro de ejercicio')
    return response
  } else {
    response.workout = editWorkoutResponse.data
    NotificationManager.success('Registro de ejercicio editado con éxito')
  }
  return response
})

/**
 * Delete workout
 */
export const deleteWorkout = createAsyncThunk('auth/deleteWorkout', async (data) => {
  const response = {
    status: 200,
    message: '',
    workoutId: null,
    error: null
  }

  let deleteWorkoutResponse = await deleteUserWorkout(data.token, data.id)
  const status = deleteWorkoutResponse.status
  deleteWorkoutResponse = await deleteWorkoutResponse.json()
  if (status !== 200) {
    response.status = status
    response.error = deleteWorkoutResponse.error
    NotificationManager.error('Ha habido un error eliminando tu registro de ejercicio')
    return response
  } else {
    response.workoutId = deleteWorkoutResponse.data.id
    NotificationManager.success('Registro de ejercicio eliminado con éxito')
  }
  return response
})

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getAllMyWorkouts.pending, (state, action) => {
        state = {
          ...initialState,
          getAllMyWorkouts: {
            ...initialState.getAllMyWorkouts,
            loading: true
          }
        }
      })
      .addCase(getAllMyWorkouts.fulfilled, (state, action) => {
        state.getAllMyWorkouts.loading = false
        if (action.payload.status === 200) {
          state.getAllMyWorkouts.success = true
          state.allMyWorkouts = action.payload.workouts
        } else {
          state.getAllMyWorkouts.error = true
          state.getAllMyWorkouts.errorMsg = action.payload.error
        }
      })
      .addCase(getAllMyWorkouts.rejected, (state, action) => {
        state.getAllMyWorkouts.loading = false
        state.getAllMyWorkouts.error = true
      })
      .addCase(deleteWorkout.pending, (state, action) => {
        state = {
          ...initialState,
          deleteWorkout: {
            ...initialState.deleteWorkout,
            loading: true
          }
        }
      })
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.deleteWorkout.loading = false
        if (action.payload.status === 200) {
          state.deleteWorkout.success = true
          state.allMyWorkouts = state.allMyWorkouts.filter(el => el.id !== action.payload.workoutId)
        } else {
          state.deleteWorkout.error = true
          state.deleteWorkout.errorMsg = action.payload.error
        }
      })
      .addCase(deleteWorkout.rejected, (state, action) => {
        state.deleteWorkout.loading = false
        state.deleteWorkout.error = true
      })
      .addCase(addWorkout.pending, (state, action) => {
        state = {
          ...initialState,
          addWorkout: {
            ...initialState.addWorkout,
            loading: true
          }
        }
      })
      .addCase(addWorkout.fulfilled, (state, action) => {
        state.addWorkout.loading = false
        if (action.payload.status === 201) {
          state.addWorkout.success = true
          state.allMyWorkouts = [...state.allMyWorkouts, action.payload.workout]
        } else {
          state.addWorkout.error = true
          state.addWorkout.errorMsg = action.payload.error
        }
      })
      .addCase(addWorkout.rejected, (state, action) => {
        state.addWorkout.loading = false
        state.addWorkout.error = true
      })
      .addCase(editWorkout.pending, (state, action) => {
        state = {
          ...initialState,
          editWorkout: {
            ...initialState.editWorkout,
            loading: true
          }
        }
      })
      .addCase(editWorkout.fulfilled, (state, action) => {
        state.editWorkout.loading = false
        if (action.payload.status === 201) {
          state.editWorkout.success = true
          state.allMyWorkouts = [...state.allMyWorkouts.filter(el => el.id !== action.payload.workout.id), action.payload.workout]
        } else {
          state.editWorkout.error = true
          state.editWorkout.errorMsg = action.payload.error
        }
      })
      .addCase(editWorkout.rejected, (state, action) => {
        state.editWorkout.loading = false
        state.editWorkout.error = true
      })
  }
})

export default workoutsSlice.reducer
