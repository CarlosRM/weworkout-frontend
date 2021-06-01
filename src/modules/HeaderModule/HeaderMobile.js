import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectEntireState } from '../../constants'
import { isUserLoggedIn } from '../../guards'
import { logout } from '../AuthModule/reducers/AuthReducer'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'

import style from './HeaderMobile.css'

const HeaderMobileComponent = () => {
  const entireState = useSelector(selectEntireState)
  const dispatch = useDispatch()

  const [showMenu, setShowMenu] = useState(false)

  function handleLogout () {
    dispatch(logout())
    setShowMenu(false)
  }

  function openMenu () {
    setShowMenu(true)
  }

  function closeMenu () {
    setShowMenu(false)
  }

  return (
    isUserLoggedIn(entireState)
      ? <div className={style.headerWrapper}>
        <nav className={style.header}>
          <img className={style.header__logo} src='/src/assets/images/logo.png'></img>
          <MenuIcon onClick={openMenu} />
          {showMenu && <div className={style.header__content}>
            <div className={style.header__bar}>
              <img className={style.header__logo} src='/src/assets/images/logo.png'></img>
              <CloseIcon onClick={closeMenu} />
            </div>
            <Link onClick={closeMenu} to='/dashboard' className={style.header__link}>Home</Link>
            <Link onClick={closeMenu} to='/search' className={style.header__link}>Buscar</Link>
            <Link onClick={closeMenu} to='/favourites' className={style.header__link}>Favoritos</Link>
            <Link onClick={closeMenu} to='/profile' className={style.header__link}>Perfil</Link>
            <button className={style.header__link} onClick={handleLogout}>Logout</button>
          </div>}
        </nav>
      </div>
      : <div className={style.headerWrapperOutside}>
          <nav className={style.header}>
            <img className={style.header__logo} src='/src/assets/images/logo.png'></img>
            <MenuIcon onClick={openMenu} />
            {showMenu && <div className={style.header__content}>
              <div className={style.header__bar}>
                <img className={style.header__logo} src='/src/assets/images/logo.png'></img>
                <CloseIcon onClick={closeMenu} />
              </div>
              <Link onClick={closeMenu} to='/' className={style.header__link}>Home</Link>
              <Link onClick={closeMenu} to='/login' className={style.header__link}>Iniciar sesión</Link>
              <Link onClick={closeMenu} to='/register' className={style.header__link}>Registrarse</Link>
            </div>}

          </nav>
        </div>
  )
}

export default HeaderMobileComponent
