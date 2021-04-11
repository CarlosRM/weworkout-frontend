import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { VanillaButton } from '../../components/VanillaButton'
import { selectEntireState } from '../../constants'
import { isUserLoggedIn } from '../../guards'
import { logout } from '../AuthModule/reducers/AuthReducer'

import style from './HeaderComponent.css'

const HeaderComponent = () => {
  const entireState = useSelector(selectEntireState)
  const dispatch = useDispatch()

  function handleLogout () {
    dispatch(logout())
  }

  return (
    <div>
      {isUserLoggedIn(entireState) &&
      <nav className={style.header}>
        <VanillaButton onClick={handleLogout}>Logout</VanillaButton>
      </nav>}

    </div>

  )
}

export default HeaderComponent
