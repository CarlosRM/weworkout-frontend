/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'
import { selectCategories, selectRoutines, selectUsers, selectExercises } from '../../../constants'
import { VanillaButton } from '../../../components/VanillaButton'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import VisibilityIcon from '@material-ui/icons/Visibility'
import ChatIcon from '@material-ui/icons/Chat'
import StarIcon from '@material-ui/icons/Star'
import RoutineGrid from  '../../../components/RoutineGrid/RoutineGrid'

import style from './ExerciseComponent.css'
import { Avatar, Card, CardContent } from '@material-ui/core'
import { Link } from 'react-router-dom'

const ExerciseComponent = (props) => {
  const routinesState = useSelector(selectRoutines)
  const categoriesState = useSelector(selectCategories)
  const usersState = useSelector(selectUsers)
  const exercisesState = useSelector(selectExercises)

  const exercise = exercisesState.allExercises.find(el => el.id === parseInt(props.match.params.id))

  return (
    <div className={style.main}>
      <div className={`${style.column} ${style.firstColumn}`}>
        <div className={style.exercise__heading}>
          <h1 className={style.exercise__title}>{exercise.name}</h1>
        </div>
        <div className={style.exercise__description}>
          <h2>Descripción</h2>
          <p>{exercise.description}</p>
        </div>
      </div>
      <div className={`${style.column} ${style.secondColumn}`}>
      </div>
      <div className={`${style.column} ${style.thirdColumn}`}>
        <div className={style.exercise__similars}>
          <h2>Similares</h2>
          {exercisesState.allExercises.filter(el => exercise.similar.includes(el.id)).map((ex, idx) =>
          <Link key={idx} to={`/exercise/${ex.id}`} className={style.similar}>
            <Card>
              <CardContent>
                <h3>{ex.name}</h3>
              </CardContent>
            </Card>
          </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExerciseComponent
