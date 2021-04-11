import React from 'react'
import FrontPageHeroComponent from './components/FrontPageHero/FrontPageHeroComponent'

import style from './FrontPageComponent.css'

const FrontPageComponent = () => {
  return (
    <div className={style.main}>
        <FrontPageHeroComponent />
    </div>
  )
}

export default FrontPageComponent
