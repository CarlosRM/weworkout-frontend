/* eslint-disable react/prop-types */
import React from 'react'

import style from './RoutineCard.css'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import VisibilityIcon from '@material-ui/icons/Visibility'
import ChatIcon from '@material-ui/icons/Chat'
import StarIcon from '@material-ui/icons/Star'

const RoutineCard = (props) => {
  return (
    <div className={`${style.card__wrapper} ${props.hide ? style.card__hide : style.card__show}`}>
      <Card className={style.card}>
        <CardContent>
          <div className={style.card__header}>
            <Avatar>
              R
            </Avatar>
            <h3 className={style.card__title}>{props.routine.name}</h3>
          </div>
          <p>{props.routine.description}</p>
          <div className={style.card__stats}>
            <div className={`${style.card__rating} ${style.card__stat}`}>
              <StarIcon></StarIcon>
              <span>{props.routine.rating}</span>
            </div>
            <div className={`${style.card__comments} ${style.card__stat}`}>
              <ChatIcon></ChatIcon>
              <span>{props.routine.comments.length}</span>
            </div>
            <div className={`${style.card__views} ${style.card__stat}`}>
              <VisibilityIcon></VisibilityIcon>
              <span></span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RoutineCard
