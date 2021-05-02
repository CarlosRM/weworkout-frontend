/* eslint-disable react/prop-types */
import React from 'react'

import style from './ExerciseCard.css'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Link } from 'react-router-dom'

const ExerciseCard = (props) => {
  return (
    <div className={`${style.card__wrapper} ${props.hide ? style.card__hide : style.card__show}`}>
      <Link to={`/exercise/${props.exercise.id}`}>
        <Card>
          <CardContent>
            <h3>{props.exercise.name}</h3>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}

export default ExerciseCard
