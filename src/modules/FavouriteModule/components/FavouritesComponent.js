import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuth, selectRoutines } from '../../../constants'

import style from './FavouritesComponent.css'
import RoutineGrid from '../../../components/RoutineGrid/RoutineGrid'

const FavouritesComponent = () => {
  const routinesState = useSelector(selectRoutines)
  const authState = useSelector(selectAuth)

  function isDataReady () {
    return routinesState.getAllRoutines.success &&
           authState.user !== null
  }

  function getFavouriteRoutines () {
    return routinesState.allRoutines.filter(el => authState.user.favourite_routines.includes(el.id))
  }

  return (
    <div className={style.main}>
        {isDataReady &&
          <div className={style.categoriesContainer}>
            <RoutineGrid title={'Favoritos'} routines={getFavouriteRoutines()} />
          </div>
        }
    </div>
  )
}

export default FavouritesComponent
