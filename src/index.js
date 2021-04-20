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
                functions={[guards.isUserLoggedOut]}
                appState={entireState}
                redirect='/dashboard'
                path="/" component={FrontPageComponent} exact />

              <ProtectedRoute
                functions={[guards.isUserLoggedIn]}
                appState={entireState}
                redirect='/login'
                path="/dashboard" component={DashboardComponent} exact />
              <Redirect to="/" />
            </Switch>
          <FooterComponent />
        </Router>
      </ThemeProvider>
    </div>

  )
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'))
