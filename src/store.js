import { combineReducers, configureStore } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'
import AuthReducer from './modules/AuthModule/reducers/AuthReducer'
import CategoriesReducer from './modules/CategoriesModule/reducers/CategoriesReducer'
import RoutinesReducer from './modules/RoutinesModule/reducers/RoutinesReducer'

const reducers = combineReducers({
  auth: AuthReducer,
  routines: RoutinesReducer,
  categories: CategoriesReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'resetState') {
    new Cookies().remove('WeWorkoutToken')
    state = undefined
  }
  return reducers(state, action)
}

const store = configureStore({
  reducer: rootReducer
})

export default store
