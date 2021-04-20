import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'
import { getCategories } from '../../ApiModule/api'

const initialState = {
  getAllCategories: {
    success: false,
    error: false,
    errorMsg: null,
    loading: false
  },
  allCategories: []
}

/**
 * Login a user:
 */
export const getAllCategories = createAsyncThunk('categories/getAllCategories', async (data) => {
  const response = {
    status: 200,
    categories: null,
    error: null
  }

  const token = new Cookies().get('WeWorkoutToken')
  let getAllCategoriesResponse = await getCategories(token)
  const status = getAllCategoriesResponse.status
  getAllCategoriesResponse = await getAllCategoriesResponse.json()
  if (status !== 200) {
    response.status = status
    response.error = getAllCategoriesResponse.error
    return response
  } else {
    response.categories = getAllCategoriesResponse.data
  }
  return response
})

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getAllCategories.pending, (state, action) => {
        state = {
          ...initialState,
          getAllCategories: {
            ...initialState.getAllCategories,
            loading: true
          }
        }
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.getAllCategories.loading = false
        if (action.payload.status === 200) {
          state.getAllCategories.success = true
          state.allCategories = action.payload.categories
        } else {
          state.getAllCategories.error = true
          state.getAllCategories.errorMsg = action.payload.error
        }
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.getAllCategories.loading = false
        state.getAllCategories.error = true
      })
  }
})

export default categoriesSlice.reducer
