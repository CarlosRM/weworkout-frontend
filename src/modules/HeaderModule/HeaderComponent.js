import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectEntireState } from '../../constants'
import { isUserLoggedIn } from '../../guards'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'
import { logout } from '../AuthModule/reducers/AuthReducer'

import style from './HeaderComponent.css'

const HeaderComponent = () => {
  const entireState = useSelector(selectEntireState)
  const dispatch = useDispatch()

  const { width } = useWindowDimensions()

  function handleLogout () {
    dispatch(logout())
  }

  return (
    <div className={style.headerWrapper}>
      {isUserLoggedIn(entireState) &&
      <nav className={style.header}>
        <Link to='/dashboard' className={style.header__link}>Home</Link>
        <Link to='/search' className={style.header__link}>Buscar</Link>
        <Link to='/favourites' className={style.header__link}>Favoritos</Link>
        <Link to='/profile' className={style.header__link}>Perfil</Link>
        <button className={style.header__link} onClick={handleLogout}>Logout</button>
      </nav>}

    </div>

  )
}

export default HeaderComponent
