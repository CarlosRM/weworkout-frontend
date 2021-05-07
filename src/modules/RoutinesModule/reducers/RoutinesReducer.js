import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'
import { addUserRoutine, deleteUserRoutine, getRoutines, editUserRoutine, addUserComment } from '../../ApiModule/api'

const initialState = {
  getAllRoutines: {
    success: false,
    error: false,
    errorMsg: null,
    loading: false
  },
  deleteRoutine: {
    success: false,
    error: false,
    errorMsg: null,
    loading: false
  },
  addRoutine: {
    success: false,
    error: false,
    errorMsg: null,
    loading: false
  },
  editRoutine: {
    success: false,
    error: false,
    errorMsg: null,
    loading: false
  },
  addComment: {
    success: false,
    error: false,
    errorMsg: null,
    loading: false
  },
  allRoutines: []
}

/**
 * Get All Routines
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

/**
 * Add routine
 */
export const addRoutine = createAsyncThunk('auth/addRoutine', async (data) => {
  const response = {
    status: 201,
    message: '',
    routine: null,
    error: null
  }

  let addRoutineResponse = await addUserRoutine(data.token, data.body)
  const status = addRoutineResponse.status
  addRoutineResponse = await addRoutineResponse.json()
  if (status !== 201) {
    response.status = status
    response.error = addRoutineResponse.error
    return response
  } else {
    response.routine = addRoutineResponse.data
  }
  return response
})

/**
 * Add routine
 */
export const editRoutine = createAsyncThunk('auth/editRoutine', async (data) => {
  const response = {
    status: 201,
    message: '',
    routine: null,
    error: null
  }

  let editRoutineResponse = await editUserRoutine(data.token, data.body, data.id)
  const status = editRoutineResponse.status
  editRoutineResponse = await editRoutineResponse.json()
  if (status !== 201) {
    response.status = status
    response.error = editRoutineResponse.error
    return response
  } else {
    response.routine = editRoutineResponse.data
  }
  return response
})

/**
 * Delete routine
 */
export const deleteRoutine = createAsyncThunk('auth/deleteRoutine', async (data) => {
  const response = {
    status: 200,
    message: '',
    routineId: null,
    error: null
  }

  let deleteRoutineResponse = await deleteUserRoutine(data.token, data.body, data.id)
  const status = deleteRoutineResponse.status
  deleteRoutineResponse = await deleteRoutineResponse.json()
  if (status !== 200) {
    response.status = status
    response.error = deleteRoutineResponse.error
    return response
  } else {
    response.routineId = deleteRoutineResponse.data.id
  }
  return response
})

/**
 * Add comment
 */
export const addComment = createAsyncThunk('auth/addComment', async (data) => {
  const response = {
    status: 201,
    message: '',
    routine: null,
    error: null
  }

  let addCommentResponse = await addUserComment(data.token, data.body, data.id)
  const status = addCommentResponse.status
  addCommentResponse = await addCommentResponse.json()
  if (status !== 201) {
    response.status = status
    response.error = addCommentResponse.error
    return response
  } else {
    response.routine = addCommentResponse.data
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
      .addCase(deleteRoutine.pending, (state, action) => {
        state = {
          ...initialState,
          deleteRoutine: {
            ...initialState.deleteRoutine,
            loading: true
          }
        }
      })
      .addCase(deleteRoutine.fulfilled, (state, action) => {
        state.deleteRoutine.loading = false
        if (action.payload.status === 200) {
          state.deleteRoutine.success = true
          state.allRoutines = state.allRoutines.filter(el => el.id !== action.payload.routineId)
        } else {
          state.deleteRoutine.error = true
          state.deleteRoutine.errorMsg = action.payload.error
        }
      })
      .addCase(deleteRoutine.rejected, (state, action) => {
        state.deleteRoutine.loading = false
        state.deleteRoutine.error = true
      })
      .addCase(addRoutine.pending, (state, action) => {
        state = {
          ...initialState,
          addRoutine: {
            ...initialState.addRoutine,
            loading: true
          }
        }
      })
      .addCase(addRoutine.fulfilled, (state, action) => {
        state.addRoutine.loading = false
        if (action.payload.status === 201) {
          state.addRoutine.success = true
          state.allRoutines = [...state.allRoutines, action.payload.routine]
        } else {
          state.addRoutine.error = true
          state.addRoutine.errorMsg = action.payload.error
        }
      })
      .addCase(addRoutine.rejected, (state, action) => {
        state.addRoutine.loading = false
        state.addRoutine.error = true
      })
      .addCase(editRoutine.pending, (state, action) => {
        state = {
          ...initialState,
          editRoutine: {
            ...initialState.editRoutine,
            loading: true
          }
        }
      })
      .addCase(editRoutine.fulfilled, (state, action) => {
        state.editRoutine.loading = false
        if (action.payload.status === 201) {
          state.editRoutine.success = true
          state.allRoutines = [...state.allRoutines.filter(el => el.id !== action.payload.routine.id), action.payload.routine]
        } else {
          state.editRoutine.error = true
          state.editRoutine.errorMsg = action.payload.error
        }
      })
      .addCase(editRoutine.rejected, (state, action) => {
        state.editRoutine.loading = false
        state.editRoutine.error = true
      })
      .addCase(addComment.pending, (state, action) => {
        state = {
          ...initialState,
          addComment: {
            ...initialState.addComment,
            loading: true
          }
        }
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.addComment.loading = false
        if (action.payload.status === 201) {
          console.log(action.payload)
          state.addComment.success = true
          state.allRoutines = [...state.allRoutines.filter(el => el.id !== action.payload.routine.id), action.payload.routine]
        } else {
          state.addComment.error = true
          state.addComment.errorMsg = action.payload.error
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.addComment.loading = false
        state.addComment.error = true
      })
  }
})

export default routinesSlice.reducer
