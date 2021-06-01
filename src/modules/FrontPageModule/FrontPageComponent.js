import React from 'react'
import FrontPageFeatures from './components/FrontPageFeatures/FrontPageFeatures'
import FrontPageGraphs from './components/FrontPageGraphs/FrontPageGraphs'
import FrontPageHeroComponent from './components/FrontPageHero/FrontPageHeroComponent'

import style from './FrontPageComponent.css'

const FrontPageComponent = () => {
  return (
    <div className={style.main}>
        <FrontPageHeroComponent />
        <FrontPageFeatures />
        <FrontPageGraphs />
    </div>
  )
}

export default FrontPageComponent
