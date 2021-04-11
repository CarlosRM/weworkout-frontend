/* eslint-disable react/prop-types */
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function ProtectedRoute ({
  component: Component,
  functions: guards,
  appState: state,
  redirect: fallback,
  ...others
}) {
  return (
    <Route
    {...others}
      render={(props) => {
        const reducer = (value, currentGuard) => value && currentGuard(state)
        if (guards.reduce(reducer, true)) return <Component {...props} />
        else return <Redirect to={fallback}></Redirect>
      }
    }
    />
  )
}

export default ProtectedRoute
