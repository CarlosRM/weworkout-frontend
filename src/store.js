import { combineReducers, configureStore } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'
import AuthReducer from './modules/AuthModule/reducers/AuthReducer'
import CategoriesReducer from './modules/CategoriesModule/reducers/CategoriesReducer'
import RoutinesReducer from './modules/RoutinesModule/reducers/RoutinesReducer'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import persistReducer from 'redux-persist/es/persistReducer'
import UserReducer from './modules/UserModule/reducers/UserReducer'
import ExerciseReducer from './modules/ExerciseModule/reducers/ExerciseReducer'
import WorkoutReducer from './modules/WorkoutModule/reducers/WorkoutReducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  auth: AuthReducer,
  routines: RoutinesReducer,
  categories: CategoriesReducer,
  users: UserReducer,
  exercises: ExerciseReducer,
  workouts: WorkoutReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'resetState') {
    new Cookies().remove('WeWorkoutToken')
    state = undefined
  }
  return reducers(state, action)
}

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export default store
