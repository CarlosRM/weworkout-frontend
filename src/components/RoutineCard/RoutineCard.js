/* eslint-disable react/prop-types */
import React from 'react'

import style from './RoutineCard.css'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import VisibilityIcon from '@material-ui/icons/Visibility'
import ChatIcon from '@material-ui/icons/Chat'
import StarIcon from '@material-ui/icons/Star'
import { withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { selectUsers } from '../../constants'
import { useSelector } from 'react-redux'

const CustomCard = withStyles((theme) => ({
  root: {
    height: '100%'
  }
}))(Card)

const CustomCardContent = withStyles((theme) => ({
  root: {
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
  }
}))(CardContent)

const RoutineCard = (props) => {
  const usersState = useSelector(selectUsers)

  return (
    <div className={`${style.card__wrapper} ${props.hide ? style.card__hide : style.card__show}`}>
      <Link to={`/routine/${props.routine.id}`}>
        <CustomCard className={style.card}>
          <CustomCardContent>
            <div className={style.card__header}>
              <Avatar>
              {usersState.allUsers.find(user => user.id === props.routine.user_id).name.slice(0, 1).toUpperCase()}
              </Avatar>
              <h3 className={style.card__title}>{props.routine.name}</h3>
            </div>
            <p>{props.routine.description}</p>
            <div className={style.card__stats}>
              <div className={`${style.card__rating} ${style.card__stat}`}>
                <StarIcon></StarIcon>
                <span>{Math.round(props.routine.rating * 10) / 10}</span>
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
          </CustomCardContent>
        </CustomCard>
      </Link>
    </div>
  )
}

export default RoutineCard
