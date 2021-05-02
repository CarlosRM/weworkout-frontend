import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRoutines } from '../../RoutinesModule/reducers/RoutinesReducer'
import { getAllCategories } from '../../CategoriesModule/reducers/CategoriesReducer'
import { getAllUsers } from '../../UserModule/reducers/UserReducer'
import { selectRoutines, selectCategories, selectUsers } from '../../../constants'

import style from './DashboardComponent.css'
import RoutineSlider from '../../../components/RoutineSlider/RoutineSlider'
import { getAllExercises } from '../../ExerciseModule/reducers/ExerciseReducer'

const DashboardComponent = () => {
  const dispatch = useDispatch()

  const routinesState = useSelector(selectRoutines)
  const categoriesState = useSelector(selectCategories)
  const usersState = useSelector(selectUsers)

  function isDataReady () {
    return routinesState.getAllRoutines.success &&
           categoriesState.getAllCategories.success &&
           usersState.getAllUsers.success
  }

  function getRoutinesFromCategory (categoryId) {
    return routinesState.allRoutines.filter(routine => routine.categories.includes(categoryId)).slice(0, 10)
  }

  function getRoutinesFromBodypart (bodypart) {
    return routinesState.allRoutines.filter(routine => routine.bodyparts.includes(bodypart)).slice(0, 10)
  }

  useEffect(() => {
    dispatch(getAllRoutines())
    dispatch(getAllCategories())
    dispatch(getAllUsers())
    dispatch(getAllExercises())
  }, [])

  return (
    <div className={style.main}>
        {isDataReady &&
          <div className={style.categoriesContainer}>
            <RoutineSlider title={'Brazo'} routines={getRoutinesFromBodypart('Brazo')} type='bodypart'/>
            <RoutineSlider title={'Pierna'} routines={getRoutinesFromBodypart('Pierna')} type='bodypart'/>
            <RoutineSlider title={'Torso'} routines={getRoutinesFromBodypart('Torso')} type='bodypart'/>
            {categoriesState.allCategories.map((el, index) =>
              <RoutineSlider key={el.id} title={el.name} routines={getRoutinesFromCategory(el.id)} type='category'/>
            )}
          </div>
        }
    </div>
  )
}

export default DashboardComponent
