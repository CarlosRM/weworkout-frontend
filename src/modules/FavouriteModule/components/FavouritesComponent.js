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

  const favouriteRoutines = getFavouriteRoutines()

  return (
    <div className={style.main}>
        {isDataReady &&
          <div className={style.categoriesContainer}>
            {favouriteRoutines.length > 0 && <RoutineGrid title={'Favoritos'} routines={favouriteRoutines} />}
            {favouriteRoutines.length === 0 &&
              <div>
                <h1>Favoritos</h1>
                <p>Aún no tienes favoritos</p>
              </div>
            }
          </div>
        }
    </div>
  )
}

export default FavouritesComponent
