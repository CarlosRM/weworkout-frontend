import React from 'react'
import FrontPageFeatures from './components/FrontPageFeatures/FrontPageFeatures'
import FrontPageHeroComponent from './components/FrontPageHero/FrontPageHeroComponent'

import style from './FrontPageComponent.css'

const FrontPageComponent = () => {
  return (
    <div className={style.main}>
        <FrontPageHeroComponent />
        {/* <FrontPageFeatures /> */}
    </div>
  )
}

export default FrontPageComponent
