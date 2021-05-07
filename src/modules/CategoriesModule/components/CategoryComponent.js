/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRoutines } from '../../RoutinesModule/reducers/RoutinesReducer'
import { getAllCategories } from '../../CategoriesModule/reducers/CategoriesReducer'
import { selectRoutines, selectCategories } from '../../../constants'

import style from './CategoryComponent.css'
import RoutineGrid from '../../../components/RoutineGrid/RoutineGrid'

const CategoryComponent = (props) => {
  const dispatch = useDispatch()

  const routinesState = useSelector(selectRoutines)
  const categoriesState = useSelector(selectCategories)

  function isDataReady () {
    return routinesState.getAllRoutines.success &&
           categoriesState.getAllCategories.success
  }

  useEffect(() => {
    dispatch(getAllRoutines())
    dispatch(getAllCategories())
  }, [])

  function findCategoryByName (name) {
    return categoriesState.allCategories.find(el => el.name === name).id
  }

  function getRoutinesFromCategoryName (categoryName) {
    return routinesState.allRoutines.filter(routine => routine.categories.includes(findCategoryByName(props.match.params.name)))
  }

  return (
    <div className={style.main}>
        {isDataReady &&
            <RoutineGrid title={props.match.params.name} routines={getRoutinesFromCategoryName(props.match.params.name)} />
          }
    </div>
  )
}

export default CategoryComponent
