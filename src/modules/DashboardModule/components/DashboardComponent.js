import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRoutines } from '../../RoutinesModule/reducers/RoutinesReducer'
import { getAllCategories } from '../../CategoriesModule/reducers/CategoriesReducer'
import { selectRoutines, selectCategories } from '../../../constants'

import style from './DashboardComponent.css'
import RoutineSlider from '../../../components/RoutineSlider/RoutineSlider'

const DashboardComponent = () => {
  const dispatch = useDispatch()

  const routinesState = useSelector(selectRoutines)
  const categoriesState = useSelector(selectCategories)

  function isDataReady () {
    return routinesState.getAllRoutines.success &&
           categoriesState.getAllCategories.success
  }

  function getRoutinesFromCategory (categoryId) {
    return routinesState.allRoutines.filter(routine => routine.categories.includes(categoryId)).slice(0, 10)
  }

  useEffect(() => {
    dispatch(getAllRoutines())
    dispatch(getAllCategories())
  }, [])

  return (
    <div className={style.main}>
        {isDataReady &&
          <div className={style.categoriesContainer}>
            {categoriesState.allCategories.map((el, index) =>
              <RoutineSlider key={el.id} title={el.name} routines={getRoutinesFromCategory(el.id)} />
            )}
          </div>
        }
    </div>
  )
}

export default DashboardComponent
