import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom'
import style from './index.css'
import FooterComponent from './modules/FooterModule/FooterComponent'
import FrontPageComponent from './modules/FrontPageModule/FrontPageComponent'
import HeaderComponent from './modules/HeaderModule/HeaderComponent'
import { Provider, useDispatch, useSelector } from 'react-redux'
import store from './store'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import LoginComponent from './modules/AuthModule/components/LoginComponent/LoginComponent'
import ProtectedRoute from './ProtectedRoute'
import * as guards from './guards'
import { selectEntireState } from './constants'
import DashboardComponent from './modules/DashboardModule/components/DashboardComponent'
import Cookies from 'universal-cookie'
import { loginWithToken } from './modules/AuthModule/reducers/AuthReducer'
import CategoryComponent from './modules/CategoriesModule/components/CategoryComponent'
import BodypartComponent from './modules/BodypartModule/components/BodypartComponent'
import FavouritesComponent from './modules/FavouriteModule/components/FavouritesComponent'
import RoutineComponent from './modules/RoutinesModule/components/RoutineComponent'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
import UserComponent from './modules/UserModule/components/UserComponent'
import ExerciseComponent from './modules/ExerciseModule/components/ExerciseComponent'
import SearchComponent from './modules/SearchModule/components/SearchComponent'
import ProfileComponent from './modules/ProfileModule/components/ProfileComponent'
import FollowersComponent from './modules/UserModule/components/FollowersComponent'
import FolloweesComponent from './modules/UserModule/components/FolloweesComponent'
import MyRoutinesComponent from './modules/RoutinesModule/components/MyRoutinesComponent'
import AddRoutineComponent from './modules/RoutinesModule/components/AddRoutineComponent'
import EditRoutineComponent from './modules/RoutinesModule/components/EditRoutineComponent'
import EditProfileComponent from './modules/ProfileModule/components/EditProfileComponent'

const App = () => {
  const entireState = useSelector(selectEntireState)
  const dispatch = useDispatch()

  useEffect(() => {
    if (entireState.auth.logout.success) {
      dispatch({ type: 'resetState' })
    }
  }, [entireState.auth.logout.success])

  useEffect(() => {
    const token = new Cookies().get('WeWorkoutToken')
    if (token === null || token === undefined) dispatch({ type: 'resetState' })
    else {
      dispatch(loginWithToken())
    }
  }, [])

  useEffect(() => {
    if (entireState.auth.loginWithToken.error) dispatch({ type: 'resetState' })
  }, [entireState.auth.loginWithToken])

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <HeaderComponent />
            <Switch>
              <ProtectedRoute
                functions={[guards.isUserLoggedOut]}
                appState={entireState}
                redirect='/dashboard'
                path="/login" component={LoginComponent} exact />

              <ProtectedRoute
                functions={[guards.isUserLoggedIn]}
                appState={entireState}
                redirect='/login'
                path="/dashboard" component={DashboardComponent} exact />

              <ProtectedRoute
                functions={[guards.isUserLoggedIn]}
                appState={entireState}
                redirect='/login'
                path="/favourites" component={FavouritesComponent} exact />

              <ProtectedRoute
                functions={[guards.isUserLoggedIn]}
                appState={entireState}
                redirect='/login'
                path="/search" component={SearchComponent} exact />

              <ProtectedRoute
                functions={[guards.isUserLoggedIn]}
                appState={entireState}
                redirect='/login'
                path="/profile" component={ProfileComponent} exact />

              <ProtectedRoute
                functions={[guards.isUserLoggedIn]}
                appState={entireState}
                redirect='/login'
                path="/profile/edit" component={EditProfileComponent} exact />

              <ProtectedRoute
                functions={[guards.isUserLoggedIn]}
                appState={entireState}
                redirect='/login'
                path="/my-routines" component={MyRoutinesComponent} exact />

              <ProtectedRoute
                functions={[guards.isUserLoggedIn]}
                appState={entireState}
                redirect='/login'
                path="/add-routine" component={AddRoutineComponent} exact />

              <ProtectedRoute
                functions={[guards.isUserLoggedIn]}
                appState={entireState}
                redirect='/login'
                path="/edit-routine/:id" component={EditRoutineComponent} exact />

              <ProtectedRoute
                functions={[guards.isUserLoggedIn]}
                appState={entireState}
                redirect='/login'
                path="/bodypart/:name" component={BodypartComponent} exact />

              <ProtectedRoute
                functions={[guards.isUserLoggedIn]}
                appState={entireState}
                redirect='/login'
                path="/category/:name" component={CategoryComponent} exact />

              <ProtectedRoute
                functions={[guards.isUserLoggedIn]}
                appState={entireState}
                redirect='/login'
                path="/routine/:id" component={RoutineComponent} exact />

              <ProtectedRoute
                functions={[guards.isUserLoggedIn]}
                appState={entireState}
                redirect='/login'
                path="/users/:id" component={UserComponent} exact />

              <ProtectedRoute
                functions={[guards.isUserLoggedIn]}
                appState={entireState}
                redirect='/login'
                path="/users/:id/followers" component={FollowersComponent} exact />

              <ProtectedRoute
                functions={[guards.isUserLoggedIn]}
                appState={entireState}
                redirect='/login'
                path="/users/:id/followees" component={FolloweesComponent} exact />

              <ProtectedRoute
                functions={[guards.isUserLoggedIn]}
                appState={entireState}
                redirect='/login'
                path="/exercise/:id" component={ExerciseComponent} exact />

              <ProtectedRoute
                functions={[guards.isUserLoggedOut]}
                appState={entireState}
                redirect='/dashboard'
                path="/" component={FrontPageComponent} exact />
            </Switch>
          <FooterComponent />
        </Router>
      </ThemeProvider>
    </div>

  )
}

const persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>

  </Provider>,
  document.querySelector('#root'))
