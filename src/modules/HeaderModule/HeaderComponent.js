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
    isUserLoggedIn(entireState)
      ? <div className={style.headerWrapper}>
        <nav className={style.header}>
          <img className={style.header__logo} src='/src/assets/images/logo.png'></img>
          <Link to='/dashboard' className={style.header__link}>Home</Link>
          <Link to='/search' className={style.header__link}>Buscar</Link>
          <Link to='/favourites' className={style.header__link}>Favoritos</Link>
          <Link to='/profile' className={style.header__link}>Perfil</Link>
          <button className={style.header__link} onClick={handleLogout}>Logout</button>
        </nav>
      </div>
      : <div className={style.headerWrapperOutside}>
          <nav className={style.header}>
            <img className={style.header__logo} src='/src/assets/images/logo.png'></img>
            <Link to='/login' className={style.header__link}>Iniciar sesión</Link>
            <Link to='/register' className={style.header__link}>Registrarse</Link>
          </nav>
        </div>
  )
}

export default HeaderComponent
