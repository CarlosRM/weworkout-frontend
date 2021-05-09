import React from 'react'
import style from './FrontPageHeroComponent.css'
import { Link } from 'react-router-dom'
import { VanillaButton } from '../../../../components/VanillaButton'

const FrontPageHeroComponent = () => {
  return (
    <div className={style.hero}>
      <div className={style.hero__catch}>
        <h1 className={style.hero__title}>
          Únete a la mayor comunidad de fitness
        </h1>
        <Link to='/register'>
          <VanillaButton size='large'>Registrarse</VanillaButton>
        </Link>
      </div>
    </div>
  )
}

export default FrontPageHeroComponent
