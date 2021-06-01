/* eslint-disable react/prop-types */
import React from 'react'

import style from './WorkoutCard.css'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../constants'

const WorkoutCard = (props) => {
  const authState = useSelector(selectAuth)

  return (
    <div className={`${style.card__wrapper} ${props.hide ? style.card__hide : style.card__show}`}>
      <Link to={`/edit-workout/${props.workout.id}`}>
        <Card>
          <CardContent>
            <div className={style.card__workout}>
              <Avatar>
              {authState.user.name.slice(0, 1).toUpperCase()}
              </Avatar>
              <div className={style.card__workoutInfo}>
                <h3>{props.workout.name}</h3>
                <span>{props.workout.date}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}

export default WorkoutCard
